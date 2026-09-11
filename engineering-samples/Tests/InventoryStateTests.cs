using NUnit.Framework;

namespace AlesSpital.EngineeringSamples.Inventory.Tests
{
    public sealed class InventoryStateTests
    {
        [Test]
        public void Add_RespectsMaxStack_AndReportsAcceptedAmount()
        {
            var state = new InventoryState();

            Assert.That(state.Add("resource.wood", 8, 10), Is.EqualTo(8));
            Assert.That(state.Add("resource.wood", 5, 10), Is.EqualTo(2));
            Assert.That(state.Count("RESOURCE.WOOD"), Is.EqualTo(10));
        }

        [Test]
        public void TryRemove_IsTransactional_WhenQuantityIsInsufficient()
        {
            var state = new InventoryState();
            state.Add("resource.stone", 3, 99);

            Assert.That(state.TryRemove("resource.stone", 4), Is.False);
            Assert.That(state.Count("resource.stone"), Is.EqualTo(3));
        }

        [Test]
        public void TryRemove_RemovesEmptyEntry()
        {
            var state = new InventoryState();
            state.Add("resource.wood", 2, 99);

            Assert.That(state.TryRemove("resource.wood", 2), Is.True);
            Assert.That(state.Count("resource.wood"), Is.Zero);
        }
    }
}
