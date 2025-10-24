## Feats
1. 我需要你幫助我切版
### 手機版（ <768px）
1. 以下按照順序：flex flex-col 往下排版
2. banner :![alt text](../public/image/banner-collaboration.svg)
3. title:預算提案辨識驗證協作區
   ``` css
   font-family: Noto Sans TC;
    font-weight: 700;
    font-style: Bold;
    font-size: 24px;
    leading-trim: NONE;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    ```
4. 數據統計區：
   形式：{recognitionStatusesCount} 已辨識 / {recognitionImagesCount} 未辨識
   graphql query example:
   ```gql
    query RecognitionImages {
        recognitionImagesCount
        recognitionStatusesCount
    }
    ``` 
    利用api回來的資料填入形式裡面

5. QR code 區域：
   1. flex justify-between
   2. 左邊![alt text](../public/image/collaboration-QR-code.svg)
   3. 右邊文字區塊
      1. flex flex-col justify between
      2. 上：掃描 QR Code 成為 LINE 好友，就可以讓機器人替你協作辨識文件上傳！
      3. 下：教學步驟
      4. style
        ```css
        font-family: Noto Sans TC;
        font-weight: 700;
        font-style: Bold;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0%;
        text-align: center;
        background: #2E982E;
        ```

6. 原因區塊：flex flex-col items-center
   1. 標題：為什麼需要協作？
      1. 樣式：`font-family: Noto Sans TC;
                font-weight: 700;
                font-style: Bold;
                font-size: 16px;
                leading-trim: NONE;
                line-height: 100%;
                letter-spacing: 0%;
                text-align: center;`
   2. P1: 預算監督平台的預算提案資料來源，是來自立法院的「議事錄」（會議記錄的一種），立法院會將審議通過的預算提案，用文字記錄在議事錄中，透過程式比對和配對，呈現在平台上。
   3. P2: 但如果提案單被併案處理、後來撤案、或是它屬於「黨團協商」中才提出的案子，我們就只能看到它的掃描檔。
   4. P3: 透過科技的輔助（LINE 的圖片文字辨識功能），我們希望透過你和機器人簡單的互動，來將這些掃描檔數位化完成，讓大家可以更接近預算審議的全貌！
      1. P1~3 style:`font-family: Noto Sans T Chinese;
                        font-weight: 400;
                        font-style: Regular;
                        font-size: 14px;
                        leading-trim: NONE;
                        line-height: 100%;
                        letter-spacing: 0%;
                        `
      2. P1~P2, P3~P3中間都要有一個<br/>
      3. 最後要有一個border-b 1px black
7. button 區塊
   1. flex
   2. 左按鈕：教學步驟
      1. `border-1 border-black p-2.5 bg-white font-family: Noto Sans TC;
font-weight: 700;
font-style: Bold;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
text-align: center;
`
   3. 右按鈕:Q&A 區
      1. `font-family: Noto Sans TC;
font-weight: 700;
font-style: Bold;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
text-align: center;
bg-[#2E982E]
border-1 border-black p-2.5
`
   4. 如果點擊：教學步驟，顯示以下畫面：
      1. 區域一：
         1. ![alt text](../public/image/collaboration-step-1.svg)
         2. 標題：加入好友之後，傳個訊息給它就可以開始！`font-family: Noto Sans T Chinese;
font-weight: 700;
font-style: Bold;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
text-align: center;
`
         3. 內文：選擇你想進行的方式，辨識模式是透過問答來解出提案單的文字；驗證模式是驗證其他使用者辨識的答案是否正確。如果你有比較多的時間，可以選辨識模式；如果你只有 3、5 分鐘的破碎時間，可以優先選擇驗證模式。`font-family: Noto Sans T Chinese;
            font-weight: 700;
            font-style: Bold;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 100%;
            letter-spacing: 0%;
            text-align: center;
            `
      2. 區域二：
         1. ![alt text](../public/image/collaboration-step-2.svg)
         2. 標題：跟著機器人問的問題，回答就可以！
         3. 清單：
                問題包括：
                這張圖片中是哪個部會的預算？
                這張提案單上標示的預算科目為？
                這張提案單上標示的預算金額為？
                這是減列、凍結、減列＋凍結還是主決議？
                這張提案單標示的 [減列/凍結] 金額為？
                提案單的案由（請見下一步）
                提案單上的提案人是誰？
                提案單上的連署人是誰？
         4. 經過這些問題，我們就可以完整地把一張提案單的內容解析出來！
      3. 區域三：
         1. ![alt text](../public/image/collaboration-step-3.svg)
      4. 區域四：
         1. ![alt text](../public/image/collaboration-step-4.svg)
         2. 標題：關於「案由」的辨識，可以點開圖片之後，點選「轉為文字」按鈕
         3. 內容：只要選擇「案由」文字區塊即可（手機長按文字的部分可以選取，電腦的話是用滑鼠選取文字部分）。空格、換行不需要額外處理。
      5. 區域五：
         1. ![alt text](../public/image/collaboration-step-5.svg)
         2. 內容：但如果有手寫的修改，請協助將手寫修改的部分，更正到你傳送的內容。
   5. 如果點擊：Q&A 區:
      1. 標題：什麼樣的提案單會需要辨識？
      2. 清單：大部分通過的預算提案都會被記錄在議事錄中，我們可以拿到文字檔。僅有幾下幾種狀況會有掃描檔：
        該提案被撤案
        該提案被併案（多個提案單經過協調之後，決定併案成一個通過）
        黨團協商的提案
### 桌機版（>= 768px）
基本上相同排版。給他max-width:680px就好。


## Reminders:
1. 注意a11y : https://a11yvillage.coseeing.org/zh-TW
2. 要記得產生新的頁面、連結route
