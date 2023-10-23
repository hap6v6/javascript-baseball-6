import { MissionUtils } from "@woowacourse/mission-utils";
import { enterNumber } from "./player.js";

export async function pickRandomNumber() {
  MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

  const computer = [];
  while (computer.length < 3) {
    const number = MissionUtils.Random.pickNumberInRange(1, 9);
    if (!computer.includes(number)) {
      computer.push(number);
    }
  }
  await enterNumber(computer);
}

export function judgeNumber(computerNum, playerNum) {
  let strike = 0;
  let ball = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (playerNum[i] == computerNum[j]) {
        if (i == j) {
          strike++;
        } else {
          ball++;
        }
        break;
      }
    }
  }

  if (strike == 3) {
    MissionUtils.Console.print('3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료');
    endGame();
  } else if (strike == 0 && ball == 0) {
    MissionUtils.Console.print('낫싱');
    enterNumber(computerNum);
  } else {
    const ballComment = ball == 0 ? '' : `${ball}볼 `
    const strikeComment = strike == 0 ? '' : `${strike}스트라이크`;
    MissionUtils.Console.print(`${ballComment}${strikeComment}`);

    enterNumber(computerNum);
  }
}

export async function endGame() {
  const REGEX = /[^1-2]/; // 숫자 1~2 외의 문자 찾아내는 정규표현식

  try {
    const gameStatus = await MissionUtils.Console.readLineAsync('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n');

    // 예외사항 처리
    if (REGEX.test(gameStatus)) {
      MissionUtils.Console.print('[ERROR] 숫자 1 또는 2만 입력해주세요. (공백 없이)');
      throw new Error('숫자 1,2 외 문자 입력 오류');
    } else if (gameStatus.length != 1) {
      MissionUtils.Console.print('[ERROR] 1개의 숫자만 입력해주세요.');
      throw new Error('숫자 개수 오류');
    }

    if (gameStatus == 1) {
      pickRandomNumber();
    } 
  } catch (error) {
    MissionUtils.Console.print(error);
  }
}