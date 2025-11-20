import React, { useState, useEffect, ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { times } from 'lodash';
import StepIcon from './StepIcon';

interface ProgressStepsProps {
  isComplete?: boolean;
  activeStep?: number;
  topOffset?: number;
  marginBottom?: number;
  children: ReactElement[];
  
  // Style props to pass to StepIcon
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  activeStepIconBorderColor?: string;
  progressBarColor?: string;
  completedProgressBarColor?: string;
  activeStepIconColor?: string;
  disabledStepIconColor?: string;
  completedStepIconColor?: string;
  labelFontFamily?: string;
  labelColor?: string;
  labelFontSize?: number;
  activeLabelColor?: string;
  activeLabelFontSize?: number;
  completedLabelColor?: string;
  activeStepNumColor?: string;
  completedStepNumColor?: string;
  disabledStepNumColor?: string;
  completedCheckColor?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  isComplete = false,
  activeStep = 0,
  topOffset = 30,
  marginBottom = 50,
  children,
  // Extract style props
  borderWidth,
  borderStyle,
  activeStepIconBorderColor,
  progressBarColor,
  completedProgressBarColor,
  activeStepIconColor,
  disabledStepIconColor,
  completedStepIconColor,
  labelFontFamily,
  labelColor,
  labelFontSize,
  activeLabelColor,
  activeLabelFontSize,
  completedLabelColor,
  activeStepNumColor,
  completedStepNumColor,
  disabledStepNumColor,
  completedCheckColor,
}) => {
  const [stepCount, setStepCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(activeStep);

  useEffect(() => {
    setStepCount(React.Children.count(children));
  }, [children]);

  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);

  const renderStepIcons = () => {
    // Prepare style props to pass down
    const styleProps = {
      borderWidth,
      borderStyle,
      activeStepIconBorderColor,
      progressBarColor,
      completedProgressBarColor,
      activeStepIconColor,
      disabledStepIconColor,
      completedStepIconColor,
      labelFontFamily,
      labelColor,
      labelFontSize,
      activeLabelColor,
      activeLabelFontSize,
      completedLabelColor,
      activeStepNumColor,
      completedStepNumColor,
      disabledStepNumColor,
      completedCheckColor,
    };

    return times(stepCount, (i) => {
      const isCompletedStep = isComplete ? true : i < currentStep;
      const isActiveStep = isComplete ? false : i === currentStep;

      return (
        <View key={i}>
          <StepIcon
            {...styleProps}
            stepNum={i + 1}
            stepCount={stepCount}
            label={(children[i] as ReactElement<any>).props.label}
            isFirstStep={i === 0}
            isLastStep={i === stepCount - 1}
            isCompletedStep={isCompletedStep}
            isActiveStep={isActiveStep}
          />
        </View>
      );
    });
  };

  const setActiveStep = (step: number) => {
    if (step >= stepCount - 1) {
      setCurrentStep(stepCount - 1);
    } else if (step > -1 && step < stepCount - 1) {
      setCurrentStep(step);
    }
  };

  const styles: { [key: string]: ViewStyle } = {
    stepIcons: {
      position: 'relative',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      flexDirection: 'row',
      top: topOffset,
      marginBottom: marginBottom,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.stepIcons}>{renderStepIcons()}</View>
      <View style={{ flex: 1 }}>
        {React.cloneElement(children[currentStep] as ReactElement, {
          setActiveStep: setActiveStep,
          activeStep: currentStep,
          stepCount: stepCount,
        })}
      </View>
    </View>
  );
};

export default ProgressSteps;