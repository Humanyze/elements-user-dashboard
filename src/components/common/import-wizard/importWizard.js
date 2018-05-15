import React from 'react';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';


const enhance = compose(
    withProps(
        ({ validationReady, isValidating, isValid, isImporting, importComplete }) => {
            return ({
                fileState: validationReady ? 'succeeded' : 'ready',
                validateState: isValid ? 'succeeded' : isValidating ? 'running' : 'ready',
                importState: importComplete ? 'succeeded' : isImporting ? 'running' : 'ready'
            });
        }
    )
);

const fontAwesomePathTable = 'M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z';
const fontAwesomePathDatabase = 'M896 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-384q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-1152q208 0 385 34.5t280 93.5 103 128v128q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-128q0-69 103-128t280-93.5 385-34.5z';
const humanyzeUIPathCheckmark = 'M11397.737,473.479c5.533,1.8,10.594,8.521,10.594,8.521l14.638-23.937';
const SVG_WIDTH = 500;
const SVG_HEIGHT = 125;
const STEP_CIRCLE_RADIUS = 20;
const STEPS_VERTICAL = 50;
const STEP_1_HORIZONTAL = 50;


const fileStates = {
    'ready'    : 'ImportWizard__file-ready',
    'running'  : 'ImportWizard__file-running',
    'succeeded': 'ImportWizard__file-succeeded'
};

const validationStates = {
    'ready'    : 'ImportWizard__validation-ready',
    'running'  : 'ImportWizard__validation-running',
    'succeeded': 'ImportWizard__validation-succeeded'
};

const importStates = {
    'ready'    : 'ImportWizard__import-ready',
    'running'  : 'ImportWizard__import-running',
    'succeeded': 'ImportWizard__import-succeeded'
};

const ImportWizardPure = ({ translations, fileState = 'ready', validateState = 'ready', importState = 'ready' }) => {
    return (
        <div className='import-wizard-wrapper'>
            <svg className='import-wizard'
                 width={SVG_WIDTH}
                 height={SVG_HEIGHT}>
                <g className='wizard-steps'>


                    {/* CONNECTORS */}
                    <g className={`wizard-connector add-to-validate ${fileState}`}>
                        <line className='background'
                              x1={70}
                              y1={STEPS_VERTICAL}
                              x2={230}
                              y2={STEPS_VERTICAL}/>
                    </g>

                    <g className={`wizard-connector validate-to-import ${validateState}`}>
                        <line className='background'
                              x1={270}
                              y1={STEPS_VERTICAL}
                              x2={430}
                              y2={STEPS_VERTICAL}/>
                    </g>


                    <g className={`wizard-step add ${fileState}`}>

                        <g className='wizard-step-circle'>
                            <circle className='wizard-step-circle-background'
                                    cx={STEP_1_HORIZONTAL}
                                    cy={STEPS_VERTICAL}
                                    r={STEP_CIRCLE_RADIUS}/>
                        </g>

                        <svg className='wizard-step-icon'
                             viewBox='0 0 1792 1792'
                             width='20'
                             height='20'
                             x={STEP_1_HORIZONTAL - 10}
                             y={STEPS_VERTICAL - 10}>
                            <path d={fontAwesomePathTable}/>
                        </svg>

                        <text className='wizard-step-text'
                              x={STEP_1_HORIZONTAL}
                              y={100}>
                            { translations[fileStates[fileState]]}
                        </text>
                    </g>


                    <g className={`wizard-step validate ${validateState}`}>
                        <g className='wizard-step-circle'>
                            <circle className='wizard-step-circle-background'
                                    cx={250}
                                    cy={STEPS_VERTICAL}
                                    r={STEP_CIRCLE_RADIUS}/>
                        </g>

                        <svg className='wizard-step-icon'
                             viewBox='0 0 1792 1792'
                             width='20'
                             height='20'
                             x='240'
                             y={STEPS_VERTICAL - 10}>

                            <path d={fontAwesomePathDatabase}/>
                        </svg>

                        <text className='wizard-step-text'
                              x={250}
                              y={100}>
                            {translations[validationStates[validateState]]}
                        </text>
                    </g>


                    <g className={`wizard-step import ${importState}`}>

                        <g className='wizard-step-circle'>

                            <circle className='wizard-step-circle-background'
                                    cx='450'
                                    cy={STEPS_VERTICAL}
                                    r={STEP_CIRCLE_RADIUS}/>

                        </g>

                        <svg className='wizard-step-icon'
                             viewBox='14950.274 -6271.72 26.974 27.385'
                             width='20'
                             height='20'
                             x='440'
                             y={STEPS_VERTICAL - 10}>

                            <path d={humanyzeUIPathCheckmark} transform='translate(3553 -6729)'/>
                        </svg>

                        <text className='wizard-step-text'
                              x='450'
                              y='100'>

                            {translations[importStates[importState]]}

                        </text>

                    </g>

                </g>
            </svg>
        </div>
    );
};

const ImportWizard = connect(
    state => ({ translations: getCurrentTranslations(state) })
)(enhance(ImportWizardPure));

export default ImportWizard;