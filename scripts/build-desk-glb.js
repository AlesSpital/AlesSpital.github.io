const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.cwd());
const OUTPUT_PATH = path.join(ROOT, "assets", "models", "desk.glb");

const toArray = (arr) => Array.from(arr);

const createCubeGeometry = () => {
  const positions = new Float32Array([
    // +X
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    // -X
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    // +Y
    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    // -Y
    -0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    // +Z
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    // -Z
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5
  ]);

  const normals = new Float32Array([
    // +X
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    // -X
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    // +Y
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    // -Y
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    // +Z
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    // -Z
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
  ]);

  return {
    positions,
    normals,
    indices,
    min: [-0.5, -0.5, -0.5],
    max: [0.5, 0.5, 0.5]
  };
};

const createPyramidGeometry = () => {
  const faces = [
    // side 1
    [
      [0, 1, 0],
      [-0.5, 0, -0.5],
      [0.5, 0, -0.5]
    ],
    // side 2
    [
      [0, 1, 0],
      [0.5, 0, -0.5],
      [0.5, 0, 0.5]
    ],
    // side 3
    [
      [0, 1, 0],
      [0.5, 0, 0.5],
      [-0.5, 0, 0.5]
    ],
    // side 4
    [
      [0, 1, 0],
      [-0.5, 0, 0.5],
      [-0.5, 0, -0.5]
    ]
  ];

  const positions = [];
  const normals = [];
  const indices = [];

  let index = 0;
  faces.forEach((face) => {
    const [a, b, c] = face;
    const normal = computeNormal(a, b, c);
    [a, b, c].forEach((vertex) => {
      positions.push(...vertex);
      normals.push(...normal);
    });
    indices.push(index, index + 1, index + 2);
    index += 3;
  });

  // base
  const base = [
    [-0.5, 0, -0.5],
    [0.5, 0, -0.5],
    [0.5, 0, 0.5],
    [-0.5, 0, 0.5]
  ];
  const baseNormal = [0, -1, 0];
  base.forEach((vertex) => {
    positions.push(...vertex);
    normals.push(...baseNormal);
  });
  indices.push(index, index + 1, index + 2, index, index + 2, index + 3);

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
    min: [-0.5, 0, -0.5],
    max: [0.5, 1, 0.5]
  };
};

const computeNormal = (a, b, c) => {
  const ax = b[0] - a[0];
  const ay = b[1] - a[1];
  const az = b[2] - a[2];
  const bx = c[0] - a[0];
  const by = c[1] - a[1];
  const bz = c[2] - a[2];

  const nx = ay * bz - az * by;
  const ny = az * bx - ax * bz;
  const nz = ax * by - ay * bx;
  const length = Math.hypot(nx, ny, nz) || 1;
  return [nx / length, ny / length, nz / length];
};

const addPadding = (parts, byteOffset) => {
  const pad = (4 - (byteOffset % 4)) % 4;
  if (pad) {
    parts.push(Buffer.alloc(pad));
  }
  return pad;
};

const createBufferView = (bufferViews, parts, state, typedArray, target) => {
  const pad = addPadding(parts, state.byteOffset);
  state.byteOffset += pad;

  const data = Buffer.from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
  const view = {
    buffer: 0,
    byteOffset: state.byteOffset,
    byteLength: data.byteLength
  };
  if (target) {
    view.target = target;
  }
  bufferViews.push(view);
  parts.push(data);
  state.byteOffset += data.byteLength;
  return bufferViews.length - 1;
};

const createAccessor = (accessors, bufferViewIndex, componentType, count, type, min, max) => {
  const accessor = {
    bufferView: bufferViewIndex,
    componentType,
    count,
    type
  };
  if (min) accessor.min = min;
  if (max) accessor.max = max;
  accessors.push(accessor);
  return accessors.length - 1;
};

const cube = createCubeGeometry();
const pyramid = createPyramidGeometry();

const bufferViews = [];
const accessors = [];
const parts = [];
const state = { byteOffset: 0 };

const cubePosBV = createBufferView(bufferViews, parts, state, cube.positions, 34962);
const cubeNormBV = createBufferView(bufferViews, parts, state, cube.normals, 34962);
const cubeIndexBV = createBufferView(bufferViews, parts, state, cube.indices, 34963);

const cubePosAcc = createAccessor(accessors, cubePosBV, 5126, cube.positions.length / 3, "VEC3", cube.min, cube.max);
const cubeNormAcc = createAccessor(accessors, cubeNormBV, 5126, cube.normals.length / 3, "VEC3");
const cubeIndexAcc = createAccessor(accessors, cubeIndexBV, 5123, cube.indices.length, "SCALAR", [0], [cube.indices.length - 1]);

const pyrPosBV = createBufferView(bufferViews, parts, state, pyramid.positions, 34962);
const pyrNormBV = createBufferView(bufferViews, parts, state, pyramid.normals, 34962);
const pyrIndexBV = createBufferView(bufferViews, parts, state, pyramid.indices, 34963);

const pyrPosAcc = createAccessor(accessors, pyrPosBV, 5126, pyramid.positions.length / 3, "VEC3", pyramid.min, pyramid.max);
const pyrNormAcc = createAccessor(accessors, pyrNormBV, 5126, pyramid.normals.length / 3, "VEC3");
const pyrIndexAcc = createAccessor(accessors, pyrIndexBV, 5123, pyramid.indices.length, "SCALAR", [0], [pyramid.indices.length - 1]);

const materials = [
  {
    name: "Wood",
    pbrMetallicRoughness: {
      baseColorFactor: [0.91, 0.84, 0.77, 1],
      metallicFactor: 0,
      roughnessFactor: 0.9
    }
  },
  {
    name: "WoodDark",
    pbrMetallicRoughness: {
      baseColorFactor: [0.84, 0.74, 0.65, 1],
      metallicFactor: 0,
      roughnessFactor: 0.9
    }
  },
  {
    name: "Ink",
    pbrMetallicRoughness: {
      baseColorFactor: [0.18, 0.18, 0.18, 1],
      metallicFactor: 0.1,
      roughnessFactor: 0.8
    }
  },
  {
    name: "Screen",
    pbrMetallicRoughness: {
      baseColorFactor: [0.74, 0.86, 0.96, 1],
      metallicFactor: 0,
      roughnessFactor: 0.4
    },
    emissiveFactor: [0.46, 0.73, 0.92]
  },
  {
    name: "Mint",
    pbrMetallicRoughness: {
      baseColorFactor: [0.73, 0.86, 0.82, 1],
      metallicFactor: 0,
      roughnessFactor: 0.6
    }
  },
  {
    name: "Peach",
    pbrMetallicRoughness: {
      baseColorFactor: [0.95, 0.72, 0.63, 1],
      metallicFactor: 0,
      roughnessFactor: 0.7
    }
  },
  {
    name: "Cream",
    pbrMetallicRoughness: {
      baseColorFactor: [0.96, 0.93, 0.88, 1],
      metallicFactor: 0,
      roughnessFactor: 0.8
    }
  },
  {
    name: "Glow",
    pbrMetallicRoughness: {
      baseColorFactor: [1, 1, 1, 1],
      metallicFactor: 0,
      roughnessFactor: 0.4
    },
    emissiveFactor: [0.61, 0.96, 1]
  },
  {
    name: "Beam",
    pbrMetallicRoughness: {
      baseColorFactor: [0.61, 0.96, 1, 0.35],
      metallicFactor: 0,
      roughnessFactor: 0.4
    },
    emissiveFactor: [0.61, 0.96, 1],
    alphaMode: "BLEND",
    doubleSided: true
  }
];

const cubePrimitive = (materialIndex) => ({
  attributes: {
    POSITION: cubePosAcc,
    NORMAL: cubeNormAcc
  },
  indices: cubeIndexAcc,
  material: materialIndex
});

const pyramidPrimitive = (materialIndex) => ({
  attributes: {
    POSITION: pyrPosAcc,
    NORMAL: pyrNormAcc
  },
  indices: pyrIndexAcc,
  material: materialIndex
});

const meshes = [
  { name: "CubeWood", primitives: [cubePrimitive(0)] },
  { name: "CubeWoodDark", primitives: [cubePrimitive(1)] },
  { name: "CubeInk", primitives: [cubePrimitive(2)] },
  { name: "CubeScreen", primitives: [cubePrimitive(3)] },
  { name: "CubeMint", primitives: [cubePrimitive(4)] },
  { name: "CubePeach", primitives: [cubePrimitive(5)] },
  { name: "CubeCream", primitives: [cubePrimitive(6)] },
  { name: "CubeGlow", primitives: [cubePrimitive(7)] },
  { name: "Beam", primitives: [pyramidPrimitive(8)] }
];

const nodes = [];
const rootIndex = nodes.push({ name: "DeskRoot", children: [] }) - 1;

const addNode = (node) => {
  const index = nodes.push(node) - 1;
  nodes[rootIndex].children.push(index);
  return index;
};

const addCube = (name, meshIndex, translation, scale, rotation) => {
  const node = { name, mesh: meshIndex };
  if (translation) node.translation = translation;
  if (scale) node.scale = scale;
  if (rotation) node.rotation = rotation;
  return addNode(node);
};

const quatFromEuler = (x, y, z) => {
  const cx = Math.cos(x / 2);
  const sx = Math.sin(x / 2);
  const cy = Math.cos(y / 2);
  const sy = Math.sin(y / 2);
  const cz = Math.cos(z / 2);
  const sz = Math.sin(z / 2);

  return [
    sx * cy * cz + cx * sy * sz,
    cx * sy * cz - sx * cy * sz,
    cx * cy * sz + sx * sy * cz,
    cx * cy * cz - sx * sy * sz
  ];
};

addCube("DeskTop", 0, [0, 0.2, 0], [6.6, 0.25, 3.4]);

[[-2.9, -0.55, -1.3], [2.9, -0.55, -1.3], [-2.9, -0.55, 1.3], [2.9, -0.55, 1.3]].forEach((pos, index) => {
  addCube(`DeskLeg_${index + 1}`, 1, pos, [0.25, 1.1, 0.25]);
});

addCube("Monitor", 2, [1.6, 1.1, -0.7], [2.6, 1.5, 0.2]);
addCube("MonitorScreen", 3, [1.6, 1.1, -0.57], [2.3, 1.2, 0.05]);
addCube("MonitorStem", 2, [1.6, 0.55, -0.8], [0.2, 0.6, 0.2]);
addCube("MonitorBase", 2, [1.6, 0.3, -0.7], [0.9, 0.12, 0.6]);

addCube("Keyboard", 6, [0.1, 0.34, 0.75], [2.4, 0.12, 0.85]);
addCube("KeyPlate", 4, [0.1, 0.39, 0.75], [2.1, 0.02, 0.7]);
addCube("Mouse", 6, [2.2, 0.36, 0.75], [0.35, 0.18, 0.45]);

const phoneRotation = quatFromEuler(0, -0.25, 0);
addCube("Phone", 2, [-1.7, 0.38, 0.4], [0.8, 0.12, 1.6], phoneRotation);
addCube("PhoneScreen", 3, [-1.7, 0.45, 0.4], [0.68, 0.02, 1.4], phoneRotation);

addCube("ARObject", 7, [-1.7, 1.4, 0.4], [0.3, 0.3, 0.3]);
addNode({
  name: "ARBeam",
  mesh: 8,
  translation: [-1.7, 0.45, 0.4],
  scale: [1.0, 1.7, 1.0]
});

addCube("Sketchbook", 5, [-0.3, 0.32, -0.25], [1.25, 0.08, 1.5], quatFromEuler(0, 0.2, 0));

addCube("Clapper", 2, [-2.1, 0.65, -0.6], [0.9, 0.5, 0.15], quatFromEuler(0, 0.15, 0));
addCube("ClapperTop", 4, [-2.1, 0.88, -0.6], [0.9, 0.15, 0.18], quatFromEuler(0, 0.15, 0));

addCube("Mug", 6, [2.4, 0.45, -0.2], [0.45, 0.4, 0.45]);
addCube("Handheld", 4, [0.8, 0.36, 1.15], [0.7, 0.18, 0.4], quatFromEuler(0, -0.2, 0));

const gltf = {
  asset: {
    version: "2.0",
    generator: "Codex Cozy Desk Generator"
  },
  scenes: [{ nodes: [rootIndex] }],
  scene: 0,
  nodes,
  meshes,
  materials,
  bufferViews,
  accessors,
  buffers: [{ byteLength: state.byteOffset }]
};

const jsonBuffer = Buffer.from(JSON.stringify(gltf));
const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4;
const jsonChunk = Buffer.concat([jsonBuffer, Buffer.alloc(jsonPadding, 0x20)]);

const binBuffer = Buffer.concat(parts);
const binPadding = (4 - (binBuffer.length % 4)) % 4;
const binChunk = Buffer.concat([binBuffer, Buffer.alloc(binPadding)]);

const totalLength = 12 + 8 + jsonChunk.length + 8 + binChunk.length;
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0); // magic "glTF"
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLength, 8);

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonChunk.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4); // JSON

const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binChunk.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4); // BIN

const glb = Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]);

fs.writeFileSync(OUTPUT_PATH, glb);
console.log(`GLB written to ${OUTPUT_PATH}`);
