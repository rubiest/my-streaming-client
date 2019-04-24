import React from 'react';
import Modal from '../Modal';
import history from "../../history";

const StreamDelete = () => {
  const actions = (
    <React.Fragment>
      <button className="ui negative button">Delete</button>
      <div className="ui button">Cancel</div>
    </React.Fragment>
  );
  
  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content="Are you sure want to delete this stream?"
        actions={actions}
        onDismiss={() => {
          history.push("/");
        }}
      />
    </div>
  );
}

export default StreamDelete;