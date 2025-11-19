import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';

interface SpecialUserInfo {
  name: string;
  date: string;
  smileCount: number;
  immersionCount: number;
  woowahanActivity: number;
  myScore: number;
}

interface SpecialLottoModalProps {
  onClose: () => void;
  onGenerate: (userInfo: SpecialUserInfo) => void;
}

export default function LottoModal({
  onClose,
  onGenerate,
}: SpecialLottoModalProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [smileCount, setSmileCount] = useState('');
  const [immersionCount, setImmersionCount] = useState('');
  const [woowahanActivity, setWoowahanActivity] = useState('');
  const [myScore, setMyScore] = useState('');

  const handleGeneratePress = () => {
    if (!name || !birthDate) {
      alert('이름과 생년월일을 입력해주세요.');
      return;
    }

    const parsedSmileCount = parseInt(smileCount) || 0;
    const parsedImmersionCount = parseInt(immersionCount) || 0;
    const parsedWoowahanActivity = parseInt(woowahanActivity) || 0;
    const parsedMyScore = parseInt(myScore) || 1;

    onGenerate({
      name,
      date: birthDate,
      // 숫자 입력값의 범위를 강제로 조정하여 로직 오류를 방지합니다.
      smileCount: Math.min(Math.max(0, parsedSmileCount), 10),
      immersionCount: Math.min(Math.max(0, parsedImmersionCount), 10),
      woowahanActivity: Math.min(Math.max(0, parsedWoowahanActivity), 20),
      myScore: Math.min(Math.max(1, parsedMyScore), 45),
    });

    onClose();
  };

  return (
    <KeyboardAvoidingView
      style={modalStyles.centeredView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <View style={modalStyles.modalView}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={modalStyles.modalTitle}>✨ 특별 로또 정보 입력</Text>
          <Text style={modalStyles.modalText}>
            이름, 생년월일과 오늘의 활동 지표를 기반으로 번호를 생성합니다.
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
            placeholder="생년월일 (YYYYMMDD)"
            placeholderTextColor="#999"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numeric"
            maxLength={8}
          />

          <Text style={modalStyles.sectionTitle}>
            오늘의 활동 지표 (숫자만 입력)
          </Text>

          <TextInput
            style={modalStyles.input}
            placeholder="오늘 웃은 횟수 (0 ~ 10)"
            placeholderTextColor="#999"
            value={smileCount}
            onChangeText={setSmileCount}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="오늘 몰입한 횟수 (0 ~ 10)"
            placeholderTextColor="#999"
            value={immersionCount}
            onChangeText={setImmersionCount}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="디코 (게시글+댓글 횟수, 0 ~ 20)"
            placeholderTextColor="#999"
            value={woowahanActivity}
            onChangeText={setWoowahanActivity}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="오늘 땡기는 숫자 (1 ~ 45)"
            placeholderTextColor="#999"
            value={myScore}
            onChangeText={setMyScore}
            keyboardType="numeric"
            maxLength={2}
          />
        </ScrollView>

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
    </KeyboardAvoidingView>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#34383D',
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
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#B0B0B0',
    fontSize: 14,
  },
  sectionTitle: {
    marginTop: 5,
    marginBottom: 10,
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
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
    marginTop: 15,
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
    backgroundColor: '#8BC34A',
  },
  buttonClose: {
    backgroundColor: '#555',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
