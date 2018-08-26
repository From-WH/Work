// AJAX练习

button.addEventListener('click',(e)=>{
  let request = new XMLHttpRequest()
  request.open('get','/xxx')
  request.send()
  request.onreadystatechange = ()=>{
    if(request.state === 4){
      console.log('请求完成')
      if(request.status > 200 && request.status < 300){
        console.log('请求成功')
        //把符合JSON的字符串转换为JS对应的值
        let string = request.JSON.responseText
        let object = window.JSON.parse(string)
      }else if(request.status>300){
        console.log('请求失败')
      }
    }
  }
})
