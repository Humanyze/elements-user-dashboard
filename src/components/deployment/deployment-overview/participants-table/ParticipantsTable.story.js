import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import { ErrorBoundary } from 'ElementsWebCommon';
import namor from 'namor';

import ParticipantsTable from './ParticipantsTable';
import { translations } from 'Src/tests/contextCreators';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const firstName = namor.generate({ words: 1, numbers: 0 });
  const lastName = namor.generate({ words: 1, numbers: 0 });
  const manager = Math.random() > 0.7;

  const choice = list => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  };

  return {
    timezone: choice([
      'GMT',
      'CST',
      'EST',
      'MST',
      'PST',
      'AKST',
      'HST',
      'AST',
    ]),
    working_hours_start: choice( [7,8,9]),
    working_hours_end: choice( [16,17,18,19]),
    active_badge: Math.random() > 0.5 ? "N" : "Y",
    active_digital:Math.random() > 0.2 ? "Y" : "N",
    email: `${firstName}.${lastName}@email.com`,
    alias: firstName,
    gender: Math.random() > 0.5 ? "M" : "F",
    manager: manager ? "Y" : "N",
    teams_managed: manager ? Math.floor(Math.random() * 10) : 0,
    primary_team: choice([
      "Analytics",
      "Data",
      "Janitorial",
      "Combinatorics",
      "HR",
      "Sales"
    ])
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
const participants = makeData(100);

const defaultProps = {
    translations: translations,
    showLoading: false,
    participants: null,
};

const onLoad = {
    showLoading:  true
};

const normalParticipants = {
    participants,
    loading: false
}

const createComp = (props) => {
    return (
        <StoreContext>
            <RouterContext>
                <ErrorBoundary>
                    <ParticipantsTable {...defaultProps} {...props}/>
                </ErrorBoundary>
            </RouterContext>
        </StoreContext>
    );
};

storiesOf('Participants Table', module)
    .add('loading', () => createComp(onLoad))
    .add('Stable With Full Participants', () => createComp(normalParticipants));
