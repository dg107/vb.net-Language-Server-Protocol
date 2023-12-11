import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
} from 'vscode-languageserver';

// Create a connection for the server. The connection uses Node's IPC as a transport.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments = new TextDocuments();

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;

    // Check what capabilities the client supports.
    hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            // Add other capabilities here
        }
    };
});

// The content of a text document has changed.
documents.onDidChangeContent(change => {
    // Validate the document and send diagnostics, etc.
});

documents.listen(connection);
connection.listen();
