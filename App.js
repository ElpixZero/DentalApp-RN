import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {HomeScreen, PatientScreen, AddPatientsScreen, AddAppointmentScreen, PatientsScreen, ToothFormulaScreen} from './screens';

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Patient: {
      screen: PatientScreen,
    },
    AddPatient: {
      screen: AddPatientsScreen,
    },
    AddAppointment: {
      screen: AddAppointmentScreen,
    },
    Patients: {
      screen: PatientsScreen,
    },
    ToothFormula: {
      screen: ToothFormulaScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


export default createAppContainer(AppNavigator);