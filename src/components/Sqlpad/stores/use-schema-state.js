import { useCallback, useEffect } from 'react';
import message from '../common/message';
import updateCompletions from '../utilities/updateCompletions.js';
import { useKeyState } from './key-state';
import axios from '../../../config/axiosInstance';
import configConstants from '../../../config/constants';

function useSchemaState() {
  const [showSchema, setShowSchema] = useKeyState('showSchema', true);
  const [schema, setSchema] = useKeyState('schema', {});

  const toggleSchema = useCallback(() => {
    setShowSchema((showSchema) => !showSchema);
  }, [setShowSchema]);

  const loadSchemaInfo = useCallback(
    async (pipelineExecutionId, reload, loadDataStage) => {
      if (!schema[pipelineExecutionId] || reload) {
        setSchema({
          ...schema,
          [pipelineExecutionId]: {
            loading: true,
            expanded: {},
          },
        });

        const qs = reload ? '?reload=true' : '';
        const apiUrl = configConstants.apiUrlWithPort;
        const pipeLineData = await axios.get(
          `${apiUrl}/api/v1/pipeline/getDatabaseDataObjects`,
          {
            params: { pipelineExecutionId: pipelineExecutionId, loadDataStage },
          }
        );
        const { error, data } = pipeLineData;

        if (error) {
          setSchema({
            ...schema,
            [pipelineExecutionId]: {
              loading: false,
              error,
            },
          });
          // If sidebar is not shown, send error notification
          // It is otherwise shown in sidebar where schema would be
          if (!showSchema) {
            message.error(error);
          }
          return;
        }
        updateCompletions(data.body);

        // Pre-expand schemas
        const expanded = {};
        if (data) {
          Object.keys(data).forEach((schemaName) => {
            expanded[schemaName] = true;
          });
        }
        setSchema({
          ...schema,
          [pipelineExecutionId]: {
            loading: false,
            schemaInfo: data.body,
            error: null,
            expanded,
          },
        });
      }
    },
    [schema, showSchema, setSchema]
  );

  const toggleSchemaItem = useCallback(
    (connectionId, item) => {
      const connectionSchema = schema[connectionId];
      const open = !connectionSchema.expanded[item.id];
      setSchema({
        ...schema,
        [connectionId]: {
          ...connectionSchema,
          expanded: { ...connectionSchema.expanded, [item.id]: open },
        },
      });
    },
    [schema, setSchema]
  );

  return {
    showSchema,
    schema,
    toggleSchema,
    loadSchemaInfo,
    toggleSchemaItem,
  };
}

export default useSchemaState;
