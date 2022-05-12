import { useEffect } from 'react';
import useSchemaState from '../stores/use-schema-state';

/**
 * Instead of loading schema on selection,
 * this is acts as a listener-as-a-component for schema changes.
 * This is not in the schema sidebar,
 * because sidebar could be hidden and this is an application-level need
 * @param {*} props
 */

function SchemaInfoLoader({ pipelineExecutionId, loadDataStage }) {
  const { loadSchemaInfo } = useSchemaState();

  useEffect(() => {
    if (pipelineExecutionId && loadDataStage) {
      loadSchemaInfo(pipelineExecutionId, false, loadDataStage);
    }
  }, [pipelineExecutionId, loadSchemaInfo, loadDataStage]);

  return null;
}

export default SchemaInfoLoader;
