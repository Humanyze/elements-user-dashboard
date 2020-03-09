import React from 'react';
import ParticipantsTable from './ParticipantsTable';
import participants from '../fake-participant-data'

testRender(ParticipantsTable, {participants})();
