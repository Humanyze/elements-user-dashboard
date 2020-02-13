import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentTranslations } from 'ReduxCommon/language/languageReducer';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import './engagement-wizard.scss';
import { companyListRequested } from 'elements-web-common/redux/company/companyActions';

const fontAwesomePathTable = 'M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z';
const fontAwesomePathDatabase = 'M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z';
const humanyzeUIPathCheckmark = {
  viewBox: '14950.274 -6271.72 26.974 27.385',
  path: 'M11397.737,473.479c5.533,1.8,10.594,8.521,10.594,8.521l14.638-23.937',
  transform: 'translate(3553 -6729)',
};
const fontAwesomeError = {
  viewBox: '0 0 496 512',
  path: 'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z',
  transform: 'translate(0 0)',
};

const SVG_WIDTH = 600;
const SVG_HEIGHT = 125;
const STEP_CIRCLE_RADIUS = 20;
const STEPS_VERTICAL = 50;
const STEP_1_HORIZONTAL = 50;

const enhance = compose();

const metadataStates = {
  'active': 'EngagementWizard__metadata-active',
  'complete': 'EngagementWizard__metadata-complete',
};

const participantStates = {
  'pending': 'EngagementWizard__participants-pending',
  'active': 'EngagementWizard__participants-active',
  'complete': 'EngagementWizard__participants-complete',
};

const createStates = {
  'pending': 'EngagementWizard__create-pending',
  'active': 'EngagementWizard__create-active',
  'failed': 'EngagementWizard__create-failed',
  'complete': 'EngagementWizard__create-complete',
};

const updateStates = {
  'pending': 'EngagementWizard__update-pending',
  'active': 'EngagementWizard__update-active',
  'failed': 'EngagementWizard__update-failed',
  'complete': 'EngagementWizard__update-complete',
};

// The list of statenames in order, if you add to this list, it will renumber the
//  states but that will probably not affect how the code displays the states.
const machineStates = {
  ENTER_METADATA: 0,
  METADATA_ENTERED: 1,
  SELECT_PARTICIPANTS: 2,
  PARTICIPANTS_SELECTED: 3,
  SAVING_CONFIGURATION: 4,
  PROCESSING_ENGAGEMENT: 5,
  ENGAGEMENT_PROCESSING_FAILED: 5.5,
  ENGAGEMENT_PROCESSED: 6,
};

export {
  machineStates
};

const EngagementWizardPure = (props) => {
  const {
    translations,
    machineState,
    engagementExists,
  } = props;

  const processingStates = engagementExists ? updateStates : createStates;

  function metadataStateClassname() {
    if (machineState < machineStates.METADATA_ENTERED) {
      return 'active';
    }
    return 'complete';
  }

  function participantStateClassname() {
    if (machineState < machineStates.PARTICIPANTS_SELECTED) {
      if (machineState < machineStates.SELECT_PARTICIPANTS) {
        return 'pending';
      }
      return 'active';
    }
    return 'complete';
  }

  function engagementCreationStateClassname() {
    if (machineState < machineStates.PROCESSING_ENGAGEMENT) {
      return 'pending';
    }
    if (machineState === machineStates.ENGAGEMENT_PROCESSING_FAILED) {
      return 'failed';
    }
    if (machineState < machineStates.ENGAGEMENT_PROCESSED) {
      return 'active';
    }
    return 'complete';
  }

  const metadataState = metadataStateClassname();
  const participantState = participantStateClassname();
  const engagementState = engagementCreationStateClassname();
  const processIcon = engagementState === 'failed' ? fontAwesomeError : humanyzeUIPathCheckmark;

  return (
    <div className='engagement-wizard-wrapper'>
      <svg className='engagement-wizard'
        width={SVG_WIDTH}
        height={SVG_HEIGHT}>
        <g className='wizard-steps'>

          {/* CONNECTORS */}
          <g className={`wizard-connector metadata-to-participants ${metadataState}`}>
            <line className='background'
              x1={70}
              y1={STEPS_VERTICAL}
              x2={230}
              y2={STEPS_VERTICAL} />
          </g>

          <g className={`wizard-connector participants-to-process ${engagementState}`}>
            <line className='background'
              x1={270}
              y1={STEPS_VERTICAL}
              x2={430}
              y2={STEPS_VERTICAL} />
          </g>


          <g className={`wizard-step metadata ${metadataState}`}>

            <g className='wizard-step-circle'>
              <circle className='wizard-step-circle-background'
                cx={STEP_1_HORIZONTAL}
                cy={STEPS_VERTICAL}
                r={STEP_CIRCLE_RADIUS} />
            </g>

            <svg className='wizard-step-icon'
              viewBox='0 0 352 512'
              width='20'
              height='20'
              x={STEP_1_HORIZONTAL - 10}
              y={STEPS_VERTICAL - 10}>
              <path d={fontAwesomePathTable} />
            </svg>

            <text className='wizard-step-text'
              x={STEP_1_HORIZONTAL}
              y={100}>
              {translations[metadataStates[metadataState]]}
            </text>
          </g>


          <g className={`wizard-step participants ${participantState}`}>
            <g className='wizard-step-circle'>
              <circle className='wizard-step-circle-background'
                cx={250}
                cy={STEPS_VERTICAL}
                r={STEP_CIRCLE_RADIUS} />
            </g>

            <svg className='wizard-step-icon'
              viewBox='0 0 512 512'
              width='20'
              height='20'
              x='240'
              y={STEPS_VERTICAL - 10}>

              <path d={fontAwesomePathDatabase} />
            </svg>

            <text className='wizard-step-text'
              x={250}
              y={100}>
              {translations[participantStates[participantState]]}
            </text>
          </g>


          <g className={`wizard-step process ${engagementState}`}>

            <g className='wizard-step-circle'>

              <circle className='wizard-step-circle-background'
                cx='450'
                cy={STEPS_VERTICAL}
                r={STEP_CIRCLE_RADIUS} />

            </g>

            <svg className='wizard-step-icon'
              viewBox={processIcon.viewBox}
              width='20'
              height='20'
              x='440'
              y={STEPS_VERTICAL - 10}>

              <path d={processIcon.path} transform={processIcon.transform} />
            </svg>

            <text className='wizard-step-text'
              x='450'
              y='100'>

              {translations[processingStates[engagementState]]}

            </text>

          </g>

        </g>
      </svg>
    </div>
  );
};


/**
 * @description EngagementWizard is utilized is used to create engagements by gathering the
 *   > metadata,
 *   > the participants
 *   > and then signalling the backend to create the engagement tables
 *   Passed multiple boolean values, it calculates the resulting state from the combinations down to the necessary css strings.
 *  Based heavily on the Import Wizard
 * @param {Object} props
 * @param {Object} props.translations - Translation Object
 * @param {number} props.machineState - The state of the machine managing the wizard (one of machineStates)
 * @param {boolean} props.engagementExists - If true, this engagement already exists and will be updated, not created
 */

const EngagementWizard = connect(
  (state) => {
    return ({ translations: getCurrentTranslations(state), });
  }
)(enhance(EngagementWizardPure));

EngagementWizard.propTypes = {
  machineState: PropTypes.oneOf(Object.values(machineStates)).isRequired,
  engagementExists: PropTypes.oneOf([
    true,
    false
    ,
  ]).isRequired,
};
export default EngagementWizard;
