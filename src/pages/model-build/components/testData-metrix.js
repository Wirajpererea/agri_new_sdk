import React from 'react';

const TestDataMetrix = ({ metrixData }) => {
  return (
    <div className="test-data-metrix-continer">
      <table className="metrix-table">
        {metrixData.length > 0 ? (
          metrixData.map((data, index) => (
            <React.Fragment>
              {index === 0 && (
                <tr key={index}>
                  <td className="metrix-header">{data.ReferenceClass}</td>
                  <td className="metrix-header">{data.Positive}</td>
                  <td className="metrix-header">{data.Negative}</td>
                  <td className="metrix-header">{data.Actual}</td>
                  <td className="metrix-header">{data.Recall}</td>
                </tr>
              )}
              {index !== 0 && index < 5 && (
                <tr key={index}>
                  <td
                    style={
                      metrixData[metrixData.length - 5] &&
                      metrixData[metrixData.length - 5].ReferenceClass
                        ? {
                            background: metrixData[metrixData.length - 5],
                          }
                        : {}
                    }
                    className="metrix-header"
                  >
                    {data.ReferenceClass
                      ? data.ReferenceClass
                      : data.ReferenceClass}
                  </td>
                  <td
                    style={
                      metrixData[5 + index] && metrixData[5 + index].Positive
                        ? {
                            background: metrixData[5 + index].Positive,
                          }
                        : {}
                    }
                  >
                    {data.Positive}
                  </td>
                  <td
                    style={
                      metrixData[5 + index] && metrixData[5 + index].Negative
                        ? {
                            background: metrixData[5 + index].Negative,
                          }
                        : {}
                    }
                  >
                    {data.Negative}
                  </td>
                  <td
                    style={
                      metrixData[5 + index] && metrixData[5 + index].Actual
                        ? {
                            background: metrixData[5 + index].Actual,
                          }
                        : {}
                    }
                  >
                    {data.Actual}
                  </td>
                  <td
                    style={
                      metrixData[5 + index] && metrixData[5 + index].Recall
                        ? {
                            background: metrixData[5 + index].Recall,
                          }
                        : {}
                    }
                  >
                    {data.Recall}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <p>Accuracy data is empty </p>
        )}
      </table>
    </div>
  );
};

export default TestDataMetrix;
