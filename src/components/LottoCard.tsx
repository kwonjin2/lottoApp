import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottoBall from './LottoBall';

interface LottoCardProps {
  header: string;
  description: string[];
  generatedNumbers: number[];
  onGenerate: () => void;
  purchaseLotto: () => void;
  buttonTitle: string;
  buttonColor: string;
  buttonTextColor: string;
}

export default function LottoCard({
  header,
  description,
  generatedNumbers,
  onGenerate,
  buttonTitle,
  buttonColor,
  buttonTextColor,
  purchaseLotto,
}: LottoCardProps) {
  const dynamicButtonStyles = {
    backgroundColor: buttonColor,
  };
  const dynamicButtonTextStyles = {
    color: buttonTextColor,
  };
  return (
    <View style={cardStyles.simpleLotto}>
      <Text style={cardStyles.simpleHeader}>{header}</Text>
      {description.map((line, index) => (
        <Text key={index} style={cardStyles.simpleText}>
          {line}
        </Text>
      ))}
      <View style={cardStyles.lottoContainer}>
        {generatedNumbers.length > 0 && (
          <View style={cardStyles.purchaseButtonWrapper}>
            <TouchableOpacity
              style={cardStyles.purchaseButton}
              onPress={purchaseLotto}
            >
              <Text style={cardStyles.purchaseButtonText}>
                이 번호 구매하기
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={cardStyles.generateLotto}>
          {generatedNumbers.length === 0 ? (
            <Text style={cardStyles.emptyText}>
              생성된 번호가 여기에 표시됩니다.
            </Text>
          ) : (
            <View>
              <View style={cardStyles.lottos}>
                {generatedNumbers.map((number, index) => (
                  <LottoBall key={index} number={number} />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[cardStyles.generateButton, dynamicButtonStyles]}
        onPress={onGenerate}
      >
        <Text style={[cardStyles.generateButtonText, dynamicButtonTextStyles]}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  simpleLotto: {
    width: 360,
    height: 300,
    backgroundColor: '#34383D',
    borderRadius: 20,
    position: 'relative',
    paddingBottom: 20,
  },
  simpleHeader: {
    marginLeft: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
  },
  simpleText: {
    marginLeft: 20,
    color: '#B0B0B0',
    fontSize: 18,
    marginBottom: 2,
  },
  lottoContainer: {
    alignItems: 'center',
    marginTop: 17,
  },
  generateLotto: {
    width: 330,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#2A2D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6A6A6A',
  },
  lottos: {
    flexDirection: 'row',
    gap: 6,
  },
  generateButton: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  purchaseButtonWrapper: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 10,
  },
  purchaseButton: {
    backgroundColor: '#86c367',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
