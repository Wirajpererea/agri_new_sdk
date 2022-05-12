import DownloadIcon from 'mdi-react/DownloadIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import IncompleteDataNotification from '../common/IncompleteDataNotification';
import SecondsTimer from '../common/SecondsTimer.js';
import styles from './QueryResultHeader.module.css';
import ToolbarRunButton from './toolbar/ToolbarRunButton';

function QueryResultHeader({
  isRunning,
  queryId,
  queryResult,
  runQueryStartTime,
  clearQuery,
  loadDataStage,
}) {
  const config = {
    allowCsvDownload: true,
  };
  if (!isRunning || !queryResult) {
    return (
      <div className={styles.toolbar}>
        <ToolbarRunButton isRunning={isRunning} loadDataStage={loadDataStage} />
        {isRunning ? (
          <span className={styles.toolbarItem}>
            Query time: <SecondsTimer startTime={runQueryStartTime} />
          </span>
        ) : null}
      </div>
    );
  }

  const rows = queryResult.rows || [];
  const links = queryResult.links || {};
  const serverSec = queryResult.durationMs / 1000;
  const rowCount = rows.length;
  const incomplete = Boolean(queryResult.incomplete);
  const hasRows = rows.length > 0;

  return (
    <div className={styles.toolbar}>
      {/* <div className={styles.toolbarItem}>{serverSec} seconds</div>
      <div className={styles.toolbarItem}>{rowCount} rows</div>

      <div className={styles.toolbarItem}>
        {config.allowCsvDownload && hasRows && (
          <span className={styles.iconLinkWrapper}>
            <Link
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
              to={links.csv}
            >
              <DownloadIcon style={{ marginRight: 4 }} size={16} />
              .csv
            </Link>

            <Link
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
              to={links.xlsx}
            >
              <DownloadIcon style={{ marginRight: 4 }} size={16} />
              .xlsx
            </Link>

            <Link
              className={styles.iconLink}
              target="_blank"
              rel="noopener noreferrer"
              to={links.json}
            >
              <DownloadIcon style={{ marginRight: 4 }} size={16} />
              .json
            </Link>
          </span>
        )}
      </div>
      <div className={styles.toolbarItem}>
        <span className={styles.iconLinkWrapper}>
          <Link
            className={styles.iconLink}
            target="_blank"
            rel="noopener noreferrer"
            to={links.table}
            disabled={!Boolean(queryId) || queryId === 'new'}
          >
            table <OpenInNewIcon style={{ marginLeft: 4 }} size={16} />
          </Link>
        </span>
      </div> */}
      {incomplete && <IncompleteDataNotification />}
    </div>
  );
}

QueryResultHeader.propTypes = {
  isRunning: PropTypes.bool,
  queryResult: PropTypes.object,
  runQueryStartTime: PropTypes.instanceOf(Date),
};

QueryResultHeader.defaultProps = {
  isRunning: false,
};

export default QueryResultHeader;
