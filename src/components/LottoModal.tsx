import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';

interface SpecialLottoModalProps {
  onClose: () => void;
  onGenerate: (userInfo: { name: string; date: string }) => void;
}

export default function LottoModal({
  onClose,
  onGenerate,
}: SpecialLottoModalProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleGeneratePress = () => {
    onGenerate({ name, date: birthDate });
    onClose();
  };

  return (
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalTitle}>특별 로또 정보 입력</Text>
        <Text style={modalStyles.modalText}>
          운명을 기반으로 번호를 생성합니다.
        </Text>

        <TextInput
          style={modalStyles.input}
          placeholder="이름"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={modalStyles.input}
          placeholder="생년월일 (YYYY.MM.DD)"
          placeholderTextColor="#999"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
          maxLength={8}
        />

        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity
            style={[modalStyles.button, modalStyles.buttonClose]}
            onPress={onClose}
          >
            <Text style={modalStyles.textStyle}>취소</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[modalStyles.button, modalStyles.buttonGenerate]}
            onPress={handleGeneratePress}
          >
            <Text style={modalStyles.textStyle}>특별 생성</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 검정 배경
  },
  modalView: {
    width: '85%',
    backgroundColor: '#34383D', // 앱의 카드 배경색과 유사
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700', // 금색
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#B0B0B0',
  },
  input: {
    width: '100%',
    backgroundColor: '#2A2D32',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '48%',
    alignItems: 'center',
  },
  buttonGenerate: {
    backgroundColor: '#8BC34A', // 특별 로또 버튼 색상
  },
  buttonClose: {
    backgroundColor: '#555', // 취소 버튼은 어둡게
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
