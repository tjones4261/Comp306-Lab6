import React, {useState} from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight, Modal } from 'react-native';

	export default function FlatListStuff () {
	  let theData = [
	{ key: "1", element: "Fire", name: "Ozai", powerLevel: 5},
	{ key: "2", element: "Earth", name: "Kioshi", powerLevel: 10},
	{ key: "3", element: "Air", name: "Gyiatsu", powerLevel: 8 },
	{ key: "4", element: "Water", name: "Korra", powerLevel: 2 },
	];

	  const [data, setData] = useState(theData);
	  const [state, setState] = useState(5);
	  const [tempE, setTempE] = useState("null");
	  const [tempN, setTempN] = useState("null");
	  const [tempPL, setTempPL] = useState("null");
	  const [modalVisible, setModalVisible] = useState(false);
	  const [modalText, setModalText] = useState("null");
	  const [tempDN, setTempDN] = useState("null");


	  const displayItem = (item) => {
		Alert.alert("Key: " + item.key + ", name: " + item.name + ", nation: " + item.element + ", powerLevel: " +item.powerLevel);
		console.log("Key: " + item.key + ", name: " + item.name + ", nation: " + item.element + ", powerLevel: " +item.powerLevel);
	  };

	  const nameMatch = (item) =>{
	  	  return item.name == tempN;
	  }

	  const dNameMatch = (item) =>{
			console.log(item.name + " and " + tempDN + " - " + item.name == tempDN)
			//console.log(item.name + " and " + tempDN );
	  	  return item.name == tempDN;
	  }

	  const dNameMatch2 = (item) =>{
			console.log(item.name + " and " + tempDN + " - " + item.name == tempDN)
			//console.log(item.name + " and " + tempDN );
	  	  return item.name != tempDN;
	  }

	  

	  _renderItem = list => {
			return (
				<TouchableHighlight
    				onPress={() => displayItem(list.item)}
					underlayColor="yellow">
					<Text style={styles.row}>{list.item.key}: {list.item.name} </Text>
				</TouchableHighlight> 
			);
	  };

	  const updateState = () => {
		if(data.filter(nameMatch).length == 0){
			setModalText("Succesfully added: " + state + ": " + tempN + ", " + tempE + " nation , powerLevel: " + tempPL);
		setModalVisible(true);
		var newDs = [];
		newDs = data.slice();
		newDs.push({ key:state.toString(), name:tempN, element: tempE, powerLevel: tempPL})
		setData(newDs);
		setState(state+1)
		}
		else{
			setModalText("Failed to add character: try different name");
			setModalVisible(true);
		}
		
	  };

	  const deleteCharacter = () => {
	  var tempName = data.filter(dNameMatch);
		if(tempName.length > 0 && tempName[0].name == tempDN){
			var  arr = data.filter(dNameMatch2);
			setData(arr);
			setModalText("Can totally delete this guy: " + tempName[0].name);
			setModalVisible(true);
		}
		else{
			setModalText("Failed to delete character: try different name");
			setModalVisible(true);
		}
	  }

		return (
		
		  <View style={styles.container}>
		  <Text style={{fontSize: 24}}> Avatar: Character Creator</Text>
			<FlatList data={data} style={{flex: 5}}
			
			  renderItem={_renderItem} />
		  <TextInput style={{flex:1}}
			style={{height: 40, textAlign: 'center'}}
			placeholder='Enter a name'
			onChangeText={(tempN) => setTempN(tempN)}
		  />
		  <TextInput style={{flex:1}}
			style={{height: 40, textAlign: 'center'}}
			placeholder='Enter an element'
			onChangeText={(tempE) => setTempE(tempE)}
		  />
		  <TextInput style={{flex:1}}
			style={{height: 40, textAlign: 'center'}}
			placeholder='Enter a powerLevel (max: 10)'
			onChangeText={(tempPL) => setTempPL(tempPL)}
		  />
		  <Button style={{marginBottom: 100}}
			onPress={updateState }
			title='Add Person'
		  />

		  <TextInput style={{flex:1}}
			style={{height: 40, textAlign: 'center'}}
			placeholder='Enter a name'
			onChangeText={(tempDN) => setTempDN(tempDN)}
		  />
		  <Button style={{marginBottom: 100,  color: 'pink'}}
			onPress={deleteCharacter }
			title='Remove Person'
		  />
		  
		  

		  <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>

	</View>
		);
	}

	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		backgroundColor: 'cyan',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 100,
	  },
	   row: {
		 fontSize: 24, 
		 padding: 42, 
		 borderWidth: 1,
		 borderColor: "#DDDDDD",
		 backgroundColor: '#BB3333',
	 },
	 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
