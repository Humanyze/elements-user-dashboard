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



  // TODO: MOVE THIS TO REDUX
  openModal = (newModal) => {
    this.setState((prevState) => {
      return {
        openModals: [
          ...prevState.openModals,
          newModal
        ]
      };
    });
  };

  // TODO: MOVE THIS TO REDUX  
  closeTopModal = () => {
    this.setState(prevState => {
      return {
        openModals: prevState.openModals.slice(0, -1)
      };
    });
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <ActionSubBar/>
        <EquipementTable elements={this.state.elements}/>

        <ModalRoot openModals={this.state.openModals}/>
      </div>
    );
  }
}

export default App;
