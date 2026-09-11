#if UNITY_EDITOR
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace AlesSpital.EngineeringSamples.Inventory.Editor
{
    public static class ItemCatalogValidator
    {
        [MenuItem("Tools/Engineering Samples/Validate Item Definitions")]
        public static void ValidateAll()
        {
            var assets = AssetDatabase.FindAssets("t:ItemDefinition")
                .Select(AssetDatabase.GUIDToAssetPath)
                .Select(AssetDatabase.LoadAssetAtPath<ItemDefinition>)
                .Where(asset => asset != null)
                .ToArray();

            var errors = new List<string>();
            var duplicateGroups = assets
                .GroupBy(item => item.StableId)
                .Where(group => string.IsNullOrWhiteSpace(group.Key) || group.Count() > 1);

            foreach (var group in duplicateGroups)
            {
                var paths = string.Join(", ", group.Select(AssetDatabase.GetAssetPath));
                errors.Add(string.IsNullOrWhiteSpace(group.Key)
                    ? $"Missing stable ID: {paths}"
                    : $"Duplicate stable ID '{group.Key}': {paths}");
            }

            foreach (var item in assets.Where(item => string.IsNullOrWhiteSpace(item.DisplayName)))
                errors.Add($"Missing display name: {AssetDatabase.GetAssetPath(item)}");

            if (errors.Count == 0)
            {
                Debug.Log($"Validated {assets.Length} item definitions: no catalog errors found.");
                return;
            }

            foreach (var error in errors) Debug.LogError(error);
            Debug.LogError($"Item catalog validation failed with {errors.Count} issue(s). Fix data before building content.");
        }
    }
}
#endif
