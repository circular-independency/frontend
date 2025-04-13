#!/bin/bash

# Check if API key is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-env.sh <your-api-key>"
    exit 1
fi

# Create development environment file
cat > src/environments/environment.development.ts << EOL
export const environment = {
  geminiApiKey: '$1',
};
EOL

# Create production environment file
cat > src/environments/environment.prod.ts << EOL
export const environment = {
  geminiApiKey: '$1',
};
EOL

echo "Environment files have been created with your API key." 