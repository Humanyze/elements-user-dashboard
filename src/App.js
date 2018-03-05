import React, {Component} from 'react';

import './App.css';

import Header from './components/common/header/Header';
import ActionSubBar from './components/action-sub-bar/ActionSubBar';
import EquipementTable from './components/equipement-table/EquipmentTable';
import ModalRoot from './components/modal/ModalRoot';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <ActionSubBar/>
                {/* Move into Route */}
                <EquipementTable/>

                <ModalRoot/>
            </div>
        );
    }
}

export default App;
