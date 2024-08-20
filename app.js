const express = require('express')
const app = express()
const port = 8000


let toDoLists = []
let fs = require('fs');



app.set('view engine', 'pug')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(express.static('./views'));

app.get('/', (req, res) => {
    res.render('index', {toDoLists: toDoLists})
})

// ADD 요청을 처리하는 라우트 핸들러 정의
app.post('/add_list', (req, res) => {
    // 요청 본문에서 'content' 필드의 값을 가져옴
    const newContent = req.body.content

    /* alert설정은 다음시간에...
        if (newContent === '') {
        res.json({ success: false, message: '할 일을 입력해주세요' });

    } else { */

    // 콘솔에 새로운 항목을 추가한다고 로그 출력
    console.log(newContent + '추가')

    // 'toDoLists' 배열에 새로운 항목을 추가
    toDoLists.push(newContent)

    // 홈페이지로 리디렉션
    res.redirect('/')

})

// 전체삭제 요청을 처리하는 라우트 핸들러 정의
app.get('/clear_list', (req, res) => {
    console.log('클리어') 

    // 빈 배열을 전달해 초기값으로 리셋
    toDoLists = [];
    
    // 루트 페이지로 리디렉션하여 사용자에게 변경된 목록을 보여줌
    res.redirect('/')
})


// DELETE 요청을 처리하는 라우트 핸들러 정의
app.get('/delete_list/:id', (req, res) => {

     // URL 파라미터에서 'id' 값을 추출
    const deleteContent = req.params.id

    // 삭제할 항목 ID를 콘솔에 출력 (디버깅 용도)
    console.log(deleteContent + '삭제') 

    // 'toDoLists' 배열에서 'deleteContent'와 일치하지 않는 항목만 필터링하여 새로운 배열 생성
    toDoLists = toDoLists.filter((value) => value != deleteContent)

    // 루트 페이지로 리디렉션하여 사용자에게 변경된 목록을 보여줌
    res.redirect('/')
})


// CHECK용 index 요청을 처리하는 라우트 핸들러 정의
app.get('/checked/:id', (req, res) => {
    // URL 파라미터에서 'id' 값을 추출
    const checkedContent = req.params.id

    // checkedContent에서 인덱스를 추출해서 index로 지정해줌
    let index = toDoLists.indexOf(checkedContent)
})


// 해당하는 id의 update 페이지로 이동
app.get('/open_update/:id', (req, res) => {
    res.render('update', {prevContent: req.params.id})
})

// POST 요청을 처리하는 라우트 핸들러 정의
app.post('/update_list', (req, res)=> {

    // 요청 본문에서 이전 콘텐츠와 새 콘텐츠를 추출
    let prevContent = req.body.prevContent
    let newContent = req.body.newContent

    // 'toDoLists' 배열에서 이전 콘텐츠의 인덱스를 찾음
    let index = toDoLists.indexOf(prevContent)

    // 인덱스가 유효한 경우, 이전 콘텐츠를 새 콘텐츠로 교체
    toDoLists.splice(index, 1, newContent)

    // 이전 콘텐츠와 새 콘텐츠로 수정된 내용을 콘솔에 출력 (디버깅 용도)
    console.log(prevContent + '을(를)' + newContent + '(으)로 수정')

    // 루트 페이지로 리디렉션하여 사용자에게 업데이트된 목록을 보여줌
    res.redirect('/')
})


/*
 * nodejs 파일 접근방법 2가지
 *   1. get형태로 해당 파일 접근하는 url만들기
 *
 *   2. 접근파일경로 설정해주기 
 */

// 1. img get function 정의
app.get('/img', function(req,res){

    // img file Read . . . Start
    fs.readFile('./img/blueadd.png', (err,data) => {

        // data 형태 buffer 형태로 return
        // log 확인시 아래 log 주석 제거
        // console.log(data);
        
        // error 처리
        if (err) throw err;

        res.writeHead(200, {'Context-Type' : 'text/html'});
        res.end(data);

    });
    // . . . End
    
})

// 2. static으로 정적 파일경로 접근 폴더 지정
// 아래 명명한 폴더에 들어간 파일들은 서버에서 확장자형태로 바로 접근이 가능함
app.use(express.static('public'));


app.get('/gohome/', (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log('connected!')
})
