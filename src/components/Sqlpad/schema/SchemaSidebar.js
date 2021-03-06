import OpenIcon from 'mdi-react/MenuDownIcon';
import ClosedIcon from 'mdi-react/MenuRightIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { useState, useEffect } from 'react';
import Measure from 'react-measure';
import { FixedSizeList as List } from 'react-window';
import Divider from '../common/Divider';
import IconButton from '../common/IconButton';
import Input from '../common/Input';
import Sidebar from '../common/Sidebar';
import SpinKitCube from '../common/SpinKitCube';
import Text from '../common/Text';
import styles from './SchemaSidebar.module.css';
import ErrorBlock from '../common/ErrorBlock';
import Tooltip from '../common/Tooltip';
import useSchemaState from '../stores/use-schema-state';
import getSchemaList from './getSchemaList';
import searchSchemaInfo from './searchSchemaInfo';
import { Alert } from 'antd';

const ICON_SIZE = 22;
const ICON_STYLE = { marginBottom: -6, marginRight: -6, marginLeft: -4 };

function SchemaSidebar({
  pipelineExecutionId,
  loadDataStage,
  selectedPipeline,
}) {
  const { toggleSchemaItem, loadSchemaInfo, schema } = useSchemaState();
  const [schemaData, setSchemaData] = useState(schema);
  const [search, setSearch] = useState('');
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  });

  useEffect(() => {
    if (loadDataStage === 2) {
      const { ImportTableName } = selectedPipeline;
      setSearch(
        ImportTableName.split('.')
          .filter((data, index) => index !== 0)
          .join('.')
      );
      handleRefreshClick();
    }
  }, [loadDataStage, selectedPipeline]);

  const handleRefreshClick = () => {
    if (pipelineExecutionId) {
      loadSchemaInfo(pipelineExecutionId, true, loadDataStage);
    }
  };

  const { loading, schemaInfo, expanded, error } =
    (schema && schema[pipelineExecutionId]) || {};
  const filteredSchemaInfo = searchSchemaInfo(schemaInfo, search);
  const schemaList = getSchemaList(filteredSchemaInfo);

  // For windowed list rendering, we need to determine what is visible due to expanded parent
  // Show item if every parent is expanded (or doesn't have a parent)
  const visibleItems = schemaList.filter((row) =>
    row.parentIds.every((id) => expanded[id])
  );

  const Row = ({ index, style }) => {
    const row = visibleItems[index];
    const Icon = expanded[row.id] ? OpenIcon : ClosedIcon;
    if (!row) {
      return null;
    }
    if (row.type === 'schema') {
      return (
        <li
          key={row.name}
          className={styles.schema}
          style={style}
          onClick={() => toggleSchemaItem(pipelineExecutionId, row)}
        >
          <Icon size={ICON_SIZE} style={ICON_STYLE} /> {row.name}
        </li>
      );
    }
    if (row.type === 'table') {
      return (
        <li
          key={`${row.schemaName}.${row.name}`}
          className={styles.table}
          style={style}
          onClick={() => toggleSchemaItem(pipelineExecutionId, row)}
        >
          <Icon size={ICON_SIZE} style={ICON_STYLE} /> {row.name}
        </li>
      );
    }
    if (row.type === 'column') {
      const secondary = [<span key="colType"> {row.dataType}</span>];

      if (row.description) {
        const description = (
          <Tooltip
            key="colDesc"
            label={row.description}
            style={{
              'max-width': '300px',
              'white-space': 'normal',
            }}
          >
            <span className={styles.description}> - {row.description}</span>
          </Tooltip>
        );
        secondary.push(description);
      }
      return (
        <li
          key={`${row.schemaName}.${row.tableName}.${row.name}`}
          className={styles.column}
          style={style}
        >
          {row.name}
          <Text type="secondary">{secondary}</Text>
        </li>
      );
    }
  };

  let content = null;
  if (error) {
    content = <ErrorBlock>{error}</ErrorBlock>;
  } else if (loading) {
    content = (
      <div className={styles.schemaSpinner}>
        <SpinKitCube />
      </div>
    );
  } else if (true) {
    content = (
      <ul style={{ paddingLeft: 0 }}>
        <List
          style={{ position: 'absolute' }}
          height={dimensions.height}
          itemCount={visibleItems.length}
          itemSize={22}
          width={dimensions.width}
          overscanCount={10}
        >
          {Row}
        </List>
      </ul>
    );
  }

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        setDimensions(contentRect.bounds);
      }}
    >
      {({ measureRef }) => (
        <Sidebar>
          <div style={{ display: 'flex' }}>
            <Input
              value={search}
              placeholder="Filter"
              onChange={(event) => setSearch(event.target.value)}
            />
            <IconButton
              tooltip="Refresh schema"
              style={{ marginLeft: 8 }}
              disabled={loading}
              onClick={handleRefreshClick}
            >
              <RefreshIcon />
            </IconButton>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div
            style={{
              display: 'flex',
              flexGrow: 1,
            }}
          >
            <div
              ref={measureRef}
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              {content}
            </div>
          </div>
        </Sidebar>
      )}
    </Measure>
  );
}

export default SchemaSidebar;
