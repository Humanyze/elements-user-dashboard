import React, {Component} from 'react';

import './App.css';

import Header from './components/common/header/Header';
import ActionSubBar from './components/action-sub-bar/ActionSubBar';
import EquipementTable from './components/equipement-table/EquipmentTable';
import ModalRoot from './components/modal/ModalRoot';

import responseJson from './mockParticipantRes.json';

class App extends Component {

  state = {
    elements: [],
    openModals: []
  };

  async componentDidMount() {
    const res = responseJson;
    const {participants} = res;
    this.setState({elements: participants});
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ActionSubBar />
        <EquipementTable elements={this.state.elements}/>

        <ModalRoot />
      </div>
    );
  }
}

export default App;
