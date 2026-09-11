# Unity/C# engineering reference samples

These are **original reference samples written for this public portfolio**. They are not copied from Kore Meta, VR4LL, RyftRealm, RSLabs, clients, or any private repository.

The goal is narrow: make a few engineering decisions inspectable without exposing commercial code.

## What the sample demonstrates

### 1. Authoring data is not runtime state
`Runtime/ItemDefinition.cs` uses a `ScriptableObject` only for stable content definitions. Quantities and save-state do not mutate the asset. This avoids one of the easiest ways to create hidden shared state in Unity projects.

### 2. Save/runtime logic is engine-agnostic
`Runtime/InventoryState.cs` has no `UnityEngine` dependency. It uses stable string IDs instead of Unity object references, making the state easier to test, serialize, migrate, and eventually move behind a server boundary.

### 3. Invalid content fails early
`Editor/ItemCatalogValidator.cs` validates stable IDs and user-facing names from an editor menu. The intent is to catch content-authoring errors before they become runtime bugs.

### 4. Edge behaviour is tested
`Tests/InventoryStateTests.cs` checks stack limits and transactional removal. The tests are intentionally small; the point is to show how runtime state can be designed so important rules are testable without booting a scene.

## Tradeoffs

- **Stable string IDs vs direct references:** IDs add lookup/migration work, but reduce save-data coupling to Unity assets.
- **Dictionary runtime state:** appropriate for modest catalogs and direct lookup; very large/high-frequency systems might prefer indexed IDs or data-oriented storage.
- **Editor validation:** improves authoring safety, but should complement—not replace—runtime validation for external or networked data.
- **No networking layer here:** authority and replication are intentionally outside this sample. Showing a fake networking abstraction would be less useful than keeping the boundary explicit.

## Why this exists

Most of my production Unity/XR work is in private or client repositories. These samples provide a public, inspectable signal for architecture, tooling, validation and testing while respecting project confidentiality.
