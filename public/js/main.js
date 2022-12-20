var socket = io();
        var chatForm = document.getElementById('chatForm');
        var teksPesan = document.querySelector('#teksPesan');  
        var userJoin = document.querySelector('.user-join');
        var chatBox = document.querySelector('.chat-box');
        var input = document.querySelector('#input');

        // random color
        // function getRandomColor() {
        //         var letters = '0123456789ABCDEF';
        //         var color = '#';
        //         for (var i = 0; i < 6; i++) {
        //           color += letters[Math.floor(Math.random() * 16)];
        //         }
        //         return color;
        // }

        let username;
        var counts = 0;
        do{
                username=prompt("Enter Your Name : ");
                counts++

        }while(!username);
        socket.emit("new-user-joined",username);
        // let nama = window.localStorage.getItem('name');
        // socket.emit("new-user-joined",nama);


        socket.on('user-connected', (socket_name)=>{
        userJoinLeft(socket_name,'joined');

        })
        function userJoinLeft(name,status){
            let div = document.createElement('div');
            div.classList.add('user-join');
            
        //     div.style.float = 
            let content = `<p><b>${name}</b> ${status} the chat</p>`;
            div.innerHTML = content;
            chatBox.appendChild(div);
        // window.scrollTo(0, document.body.scrollHeight);
           
        }
        socket.on("user-disconnected",(user)=>{
                userJoinLeft(user,'left');
          });

        input.addEventListener('click', (e)=> {
                e.preventDefault();

                let data ={
                        user : username,
                        message : teksPesan.value
                };
                if(teksPesan!=''){
                        appendMessage2(data,'outgoing');
                        socket.emit('message', data);
                        teksPesan.value = '';
                }
                });
        function appendMessage(data,status){
                let div = document.createElement('div');
                div.classList.add('chat',status);
                let content = `
                <div class="details">
                <span>${data.user}</span>
                <p>${data.message}</p>
                </div>`
                ;
                div.innerHTML = content;
                 chatBox.appendChild(div);
        }
        function appendMessage2(data,status){
                let div = document.createElement('div');
                div.classList.add('chat',status);
                let content = `
                <div class="details">
                <p>${data.message}</p>
                </div>`
                ;
                div.innerHTML = content;
                 chatBox.appendChild(div);
        }


        socket.on('message', (data)=>{
                appendMessage(data,'incoming');

        })

        //   e.preventDefault();
        //  sendMsg(teksPesan.value)
        //  teksPesan.value = ''
        
//   });
//    const sendMsg = message =>{
        //    let msg ={
        //            user : username,
        //            message : teksPesan.value
        //    }
//            socket.emit('sendMessage', msg);
//    }
//    socket.on('sendToAll', msg=>{
//            display(msg,'incoming')
//    })
   const display = (msg,type) =>{
           const msgDiv = document.createElement('div');
           let className = type
           msgDiv.classList.add(className, 'chat')
           let innerText =`
           <div class="chat incoming">
              <img src="img/uhdpaper.com-824a-pc-4k.jpg" alt="">
            <div class="details">
                <span>${username.value}</span>
                <p class="pesan1">Halo</p>
            </div>
        </div>`
           chatBox.appendChild(msgDiv);
   }
//      socket.on('new message', function(msg) {

//       var item = document.createElement('li');
//       item.style.background = getRandomColor();
      
//       item.textContent = msg;
//       pesan.appendChild(item);












        
//       window.scrollTo(0, document.body.scrollHeight);
//   });
  

// //   let nama = window.localStorage.getItem('name');
// //   let user = `<div class="chat outgoing">
// //   <div class="details">
// //       <span>${nama.value}</span>
// //       <p class="pesan"></p>
// //   </div>
// // </div>
// // </div>`

// // let user2 = document.createElement('div');
// // nameUser.innerHTML = nama;

// // nameUser.forEach((a) => {
// //         a.innerHTML = nama;

// // })
// console.log(counts);

// console.log(user2);

