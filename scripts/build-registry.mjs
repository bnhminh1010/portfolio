import fs from 'fs';
import path from 'path';

const REGISTRY_DIR = path.resolve('registry/ui');
const SRC_DIR = path.resolve('src/components/tai-ui');

if (!fs.existsSync(REGISTRY_DIR)) {
  fs.mkdirSync(REGISTRY_DIR, { recursive: true });
}

const registryIndexPath = path.resolve('registry/registry.json');
const registryIndex = JSON.parse(fs.readFileSync(registryIndexPath, 'utf-8'));

for (const item of registryIndex.items) {
  const componentFile = item.files[0].path.replace('ui/', '');
  const sourcePath = path.join(SRC_DIR, componentFile);

  if (fs.existsSync(sourcePath)) {
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const itemManifest = {
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: [
        {
          name: componentFile,
          content: content
        }
      ]
    };

    const targetJsonPath = path.join(REGISTRY_DIR, `${item.name}.json`);
    fs.writeFileSync(targetJsonPath, JSON.stringify(itemManifest, null, 2), 'utf-8');
    console.log(`Generated registry manifest for: ${item.name}`);
  } else {
    console.warn(`Source file not found for ${item.name}: ${sourcePath}`);
  }
}

console.log('Successfully generated all registry manifests!');
