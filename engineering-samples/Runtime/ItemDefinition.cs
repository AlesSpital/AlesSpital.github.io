using UnityEngine;

namespace AlesSpital.EngineeringSamples.Inventory
{
    /// <summary>
    /// Immutable authoring data. Runtime quantities intentionally live elsewhere so
    /// ScriptableObject assets never become save-state containers.
    /// </summary>
    [CreateAssetMenu(menuName = "Engineering Samples/Item Definition", fileName = "ItemDefinition")]
    public sealed class ItemDefinition : ScriptableObject
    {
        [SerializeField] private string stableId = "item.new";
        [SerializeField] private string displayName = "New Item";
        [SerializeField, Min(1)] private int maxStack = 99;

        public string StableId => stableId;
        public string DisplayName => displayName;
        public int MaxStack => Mathf.Max(1, maxStack);

#if UNITY_EDITOR
        private void OnValidate()
        {
            stableId = (stableId ?? string.Empty).Trim().ToLowerInvariant();
            displayName = (displayName ?? string.Empty).Trim();
            maxStack = Mathf.Max(1, maxStack);
        }
#endif
    }
}
