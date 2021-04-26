function checkCashRegister(price, cash, cid) {
  
    let leftMoney = cash - price;
    let unit = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    cid = cid.reverse();
    let answer = [];
    for(let idx = 0 ; idx < cid.length ; idx++){

      let val = (leftMoney % unit[idx]).toFixed(2);
      console.log(val, leftMoney, cid[idx][1]);
      if(leftMoney >= cid[idx][1]){
        let val = cid[idx][1];
        answer.push([cid[idx][0], val]);
        console.log(leftMoney === cid[idx][1])
        if(leftMoney == cid[idx][1]){ // 이부분 == 사용했는데, 이렇게 절대 쓰지 말자 
          
          let val2 = cid[idx][1];
          cid[idx][1] = leftMoney - val2;
          leftMoney = (leftMoney - val2).toFixed(2);
        }
        else{
          leftMoney = (leftMoney - val).toFixed(2);
        }
      }
      else {
        console.log("----",leftMoney, unit[idx])
        if(leftMoney >= unit[idx]){
          if(leftMoney != 0 && leftMoney % unit[idx] == 0){
            answer.push([cid[idx][0], parseFloat(leftMoney)]);
            leftMoney = 0;
          }
          else if(leftMoney != 0 && leftMoney % unit[idx] != 0){
            let remove = parseInt(leftMoney / unit[idx]) * unit[idx];
            if(remove <= cid[idx][1]){
              answer.push([cid[idx][0], remove]);
              leftMoney = (leftMoney - remove).toFixed(2);
            }
            
          }
        }
      }
    }

    console.log(answer);
    console.log(leftMoney)
    console.log("value : ",cid);
    let sum1 = cid.reduce((sum, arr)=>{
      sum = sum + arr[1];
      return sum;
    },0)
  
    if(leftMoney != 0){
      return {status: "INSUFFICIENT_FUNDS", change: []
      }
    }
    else{
      if(sum1==0){
   return {
     status: "CLOSED", change: answer.reverse()
        }
      }
      else {
   return {
     status: "OPEN", change: answer
        }
      }
  
    }
  }
  console.log(
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])     );