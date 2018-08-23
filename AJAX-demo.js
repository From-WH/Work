button.addEventListener('click',(e)=>{
  let request = new XMLHttpRequest()
  request.open('get','/xxx')
  request.send()
  request.onreadystatechange = ()=>{
    if(request.status === 4){
      console.log('请求完成');
      if(request.status > 200 && request.status < 300){
        console.log('请求成功');
        let string = request.responseText
        let obj = window.JSON.parse(string)
      }else if(request.status > 300){
        console.log('请求失败')
      }
    }
  }
})