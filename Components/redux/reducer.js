
import { Dimensions } from 'react-native';
import moment from 'moment';

const { height } = Dimensions.get('window');
const defaultState =
{
  congtac: "AAAAA",
  dataArray: [{ id: 0, chieucao: height / 4, toggleModal: false, contend: "Title", con: [{ idcon: 0, contendC: "Task", enableNotification: true, notificationTime: moment(), chau: [] }] }],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'addNewArray':
      const idcha = state.dataArray.length - 1;
      switch (idcha < 0) {
        case true:
          return { ...state, dataArray: [...state.dataArray, { id: 0, contend: "Title", toggleModal: false, chieucao: height / 4, con: [{ idcon: 0, enableNotification: false, notificationTime: moment(), chau: [{ idchau: 0, contentChau: "Task", check: false, modalmenu: false }], contendC: "Work" }] }] }
        case false:
          let newId = state.dataArray[idcha].id + 1;
          return { ...state, dataArray: [...state.dataArray, { id: newId, contend: "Title", toggleModal: false, chieucao: height / 4, con: [{ idcon: 0, enableNotification: false, notificationTime: moment(), chau: [{ idchau: 0, contentChau: "Task", check: false, modalmenu: false }], contendC: "Work" }] }] }
      }
    case 'deleteDataFather':
      const coppyValueArray = Object.assign([], state.dataArray);
      coppyValueArray.splice(action.key, 1);
      return { ...state, dataArray: coppyValueArray }

    case 'addChildArray':
      switch (action.idcon < 0) {
        case true:
          state.dataArray[action.id].con.push({ idcon: 0, contendC: action.textchild, enableNotification: false, notificationTime: moment(), chau: [{ idchau: 0, contentChau: "Task", check: false, modalmenu: false }] })
          return { ...state, dataArray: state.dataArray }
        case false:
          const numIdcon = state.dataArray[action.id].con[action.idcon].idcon + 1;
          state.dataArray[action.id].con.push({ idcon: numIdcon, contendC: action.textchild, enableNotification: false, notificationTime: moment(), chau: [{ idchau: 0, contentChau: "Task", check: false, modalmenu: false }] })
          return { ...state, dataArray: state.dataArray }
      }

    case 'addHeight':

      const changeheight = state.dataArray[action.id].chieucao;
      const maxHeight = height * 0.75;
      return {
        ...state,
        dataArray: state.dataArray.map(e => { if (e.id !== action.id) return e; if (maxHeight <= changeheight) return { ...e }; return { ...e, chieucao: changeheight + height / 10 } })
      }

    case 'addSon':
      return { ...state, dataArray: state.dataArray.map((e) => { if (e.id !== action.id) return e; return { ...e, contend: action.text } }) };

    case 'addNephew':
      const newState = Object.assign([], state.dataArray)
      switch (action.id < 0) {
        case true:
          newState[action.idcha].con[action.idcon].chau.push({ idchau: 0, contentChau: action.textcon, check: false, modalmenu: false })
          return { ...state, dataArray: newState };
        case false:
          const numIdchau = newState[action.idcha].con[action.idcon].chau[action.id].idchau + 1;
          newState[action.idcha].con[action.idcon].chau.push({ idchau: numIdchau, contentChau: action.textcon, check: false, modalmenu: false })
          return { ...state, dataArray: newState }
      }

    case 'checkBox':
      const data = Object.assign([], state.dataArray)
      const x = state.dataArray[action.idcha].con[action.idcon].chau[action.id].check
      data[action.idcha].con[action.idcon].chau[action.id].check = !x
      return { ...state, dataArray: data }

    case 'changeTitleSon':
      const newData = Object.assign([], state.dataArray);
      if (action.updateTitle !== '')
        newData[action.idcha].con[action.idcon].contendC = action.updateTitle;
      return { ...state, dataArray: newData }

    case 'editNephew':
      const newlyData = Object.assign([], state.dataArray);
      if (action.textnephew !== '')
        newlyData[action.idcha].con[action.idcon].chau[action.idchau].contentChau = action.textnephew;
      return { ...state, dataArray: newlyData }

    case 'deleteNephew':
      const newValueArray = Object.assign([], state.dataArray);
      newValueArray[action.idcha].con[action.idcon].chau.splice(action.key, 1);
      return { ...state, dataArray: [...newValueArray] }

    case 'toggleModal':
      return { ...state, dataArray: state.dataArray.map((a) => { if (a.id !== action.idcha) return a; return { ...a, toggleModal: !a.toggleModal } }) }

    case 'toggleModalEdit':
      return { ...state, congtac: !state.congtac }

    case 'deteleSon':
      const coppynewValueArray = state.dataArray;
      const minHeight = height / 5;
      const updateHeight = coppynewValueArray[action.idcha].chieucao;
      coppynewValueArray[action.idcha].con.splice(action.key, 1);
      return { ...state, dataArray: coppynewValueArray.map((e) => { if (e.id !== action.idcha) return e; if (minHeight >= updateHeight) return { ...e }; return { ...e, chieucao: updateHeight - height / 10 } }) }

    case 'alarmNot':
      const newDataaaaa = Object.assign([], state.dataArray);
      newDataaaaa[action.idcha].con[action.idcon].notificationTime = action.not;
      return { ...state, dataArray: newDataaaaa }

    case 'toggleNot':
      const newNot = Object.assign([], state.dataArray);
      newNot[action.idcha].con[action.idcon].enableNotification = action.value;
      return { ...state, dataArray: newNot }

  }

  return state;
}


export default reducer;