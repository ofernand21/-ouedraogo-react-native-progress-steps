import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface StepIconProps {
  stepCount?: number;
  stepNum: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isActiveStep: boolean;
  isCompletedStep: boolean;

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
  label: string;
}

const StepIcon: React.FC<StepIconProps> = ({
  stepCount,
  stepNum,
  isFirstStep,
  isLastStep,
  isActiveStep,
  isCompletedStep,

  borderWidth = 3,
  borderStyle = 'solid',
  activeStepIconBorderColor = '#4BB543',

  progressBarColor = '#ebebe4',
  completedProgressBarColor = '#4BB543',

  activeStepIconColor = 'transparent',
  disabledStepIconColor = '#ebebe4',
  completedStepIconColor = '#4BB543',

  labelFontFamily,
  labelColor = 'lightgray',
  labelFontSize = 14,
  activeLabelColor = '#4BB543',
  activeLabelFontSize,
  completedLabelColor = 'lightgray',

  activeStepNumColor = 'black',
  completedStepNumColor = 'black',
  disabledStepNumColor = 'white',

  completedCheckColor = 'white',
  label,
}) => {
  const getStyles = (): {
    circleStyle: ViewStyle;
    circleText: TextStyle;
    labelText: TextStyle;
    leftBar: ViewStyle;
    rightBar: ViewStyle;
    stepNum: TextStyle;
  } => {
    if (isActiveStep) {
      return StyleSheet.create({
        circleStyle: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: activeStepIconColor,
          borderColor: activeStepIconBorderColor,
          borderWidth: 5,
          bottom: 2,
          justifyContent: 'center',  // AMÉLIORATION
          alignItems: 'center',      // AMÉLIORATION
        },
        circleText: {
          alignSelf: 'center',
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 6,  // AMÉLIORATION (était 4)
          fontFamily: labelFontFamily,
          color: activeLabelColor,
          fontSize: activeLabelFontSize || labelFontSize,
          fontWeight: '600',  // AMÉLIORATION
        },
        leftBar: {
          position: 'absolute',
          top: 40 / 2.22,
          left: 0,
          right: 40 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: completedProgressBarColor,
          marginRight: 40 / 2 + 2,
        },
        rightBar: {
          position: 'absolute',
          top: 40 / 2.22,
          right: 0,
          left: 40 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: progressBarColor,
          marginLeft: 40 / 2 + 2,
        },
        stepNum: {
          color: activeStepNumColor,
          fontSize: 16,       // AMÉLIORATION
          fontWeight: 'bold', // AMÉLIORATION
        },
      });
    } else if (isCompletedStep) {
      return StyleSheet.create({
        circleStyle: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: completedStepIconColor,
          justifyContent: 'center',  // AMÉLIORATION
          alignItems: 'center',      // AMÉLIORATION
        },
        circleText: {
          alignSelf: 'center',
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 6,  // AMÉLIORATION (était 4)
          fontFamily: labelFontFamily,
          color: completedLabelColor,
          fontSize: labelFontSize,
        },
        leftBar: {
          position: 'absolute',
          top: 36 / 2,
          left: 0,
          right: 36 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: completedProgressBarColor,
          marginRight: 36 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 36 / 2,
          right: 0,
          left: 36 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: completedProgressBarColor,
          marginLeft: 36 / 2 + 4,
        },
        stepNum: {
          color: completedStepNumColor,
          fontSize: 16,  // AMÉLIORATION
        },
      });
    } else {
      return StyleSheet.create({
        circleStyle: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: disabledStepIconColor,
          justifyContent: 'center',  // AMÉLIORATION
          alignItems: 'center',      // AMÉLIORATION
        },
        circleText: {
          alignSelf: 'center',
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 6,  // AMÉLIORATION (était 4)
          fontFamily: labelFontFamily,
          color: labelColor,
          fontSize: labelFontSize,
        },
        leftBar: {
          position: 'absolute',
          top: 36 / 2,
          left: 0,
          right: 36 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: progressBarColor,
          marginRight: 36 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 36 / 2,
          right: 0,
          left: 36 + 8,
          borderStyle: borderStyle,
          borderTopWidth: borderWidth,
          borderTopColor: progressBarColor,
          marginLeft: 36 / 2 + 4,
        },
        stepNum: {
          color: disabledStepNumColor,
          fontSize: 16,  // AMÉLIORATION
        },
      });
    }
  };

  const styles = getStyles();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleStyle}>
        <Text style={styles.circleText}>
          {isCompletedStep ? (
            <Text style={{ color: completedCheckColor, fontSize: 18, fontWeight: 'bold' }}>✓</Text>
          ) : (
            <Text style={styles.stepNum}>{stepNum}</Text>
          )}
        </Text>
      </View>
      <Text style={styles.labelText}>{label}</Text>
      {!isFirstStep && <View style={styles.leftBar} />}
      {!isLastStep && <View style={styles.rightBar} />}
    </View>
  );
};

export default StepIcon;