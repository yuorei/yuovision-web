import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/query',// TODO: envから取得するようにする
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/app/gql/': {
      preset: 'client',
      plugins: [
      //  "typescript",
      //  "typescript-operations",
      //  "typescript-react-apollo"
      ]
    }
  },
  // watch: true
}

export default config