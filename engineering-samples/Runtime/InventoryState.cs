using System;
using System.Collections.Generic;

namespace AlesSpital.EngineeringSamples.Inventory
{
    /// <summary>
    /// Serializable, engine-agnostic runtime state. Definitions are resolved by stable ID,
    /// which keeps save data independent from Unity object references.
    /// </summary>
    [Serializable]
    public sealed class InventoryState
    {
        [Serializable]
        public readonly struct Entry
        {
            public Entry(string itemId, int quantity)
            {
                ItemId = itemId;
                Quantity = quantity;
            }

            public string ItemId { get; }
            public int Quantity { get; }
        }

        private readonly Dictionary<string, int> quantities = new(StringComparer.Ordinal);

        public IEnumerable<Entry> Entries
        {
            get
            {
                foreach (var pair in quantities)
                    yield return new Entry(pair.Key, pair.Value);
            }
        }

        public int Count(string itemId) =>
            NormalizeId(itemId) is { Length: > 0 } id && quantities.TryGetValue(id, out var quantity)
                ? quantity
                : 0;

        public int Add(string itemId, int amount, int maxStack)
        {
            var id = RequireId(itemId);
            if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
            if (maxStack <= 0) throw new ArgumentOutOfRangeException(nameof(maxStack));

            var current = Count(id);
            var accepted = Math.Min(amount, maxStack - current);
            if (accepted <= 0) return 0;

            quantities[id] = current + accepted;
            return accepted;
        }

        public bool TryRemove(string itemId, int amount)
        {
            var id = RequireId(itemId);
            if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));

            var current = Count(id);
            if (current < amount) return false;

            var remaining = current - amount;
            if (remaining == 0) quantities.Remove(id);
            else quantities[id] = remaining;

            return true;
        }

        public void Restore(IEnumerable<Entry> entries)
        {
            quantities.Clear();
            if (entries == null) return;

            foreach (var entry in entries)
            {
                var id = NormalizeId(entry.ItemId);
                if (id.Length == 0 || entry.Quantity <= 0) continue;
                quantities[id] = entry.Quantity;
            }
        }

        private static string RequireId(string itemId)
        {
            var id = NormalizeId(itemId);
            return id.Length > 0 ? id : throw new ArgumentException("A stable item ID is required.", nameof(itemId));
        }

        private static string NormalizeId(string itemId) => (itemId ?? string.Empty).Trim().ToLowerInvariant();
    }
}
