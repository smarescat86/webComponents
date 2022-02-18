document.addEventListener('DOMContentLoaded', () => {

    function getsElements() {
        return {
            //Ya creados
            body: document.querySelector('body'),
            //Creamos
            btnStart: document.createElement('button'),
        }
    }

    let elements = getsElements();
    anotados = [];

    elements.btnStart.textContent = "Ranking"
    elements.btnStart.className = 'btn-style';
    elements.body.append(elements.btnStart);

    elements.btnStart.addEventListener('click', menu.bind(this));

    function menu() {
        createCard('Masculino', players);
        createCard('Femenino', playersf);
        createCardTournament('Conde de Godo - Barcelona');
        
    }

    function createCard(title, array) {
        
        let card = document.createElement('div');
        let cardTitle = document.createElement('h4');
        let cardBody = document.createElement('div');

        elements.btnStart.style.display = 'none';

        card.classList.add('card');

        cardTitle.textContent = title;
        cardBody = createTable(array);

        card.append(cardTitle, cardBody);
        
        elements.body.append(card);
    }

    function createTable(array) {

        let table =  document.createElement('table');
        let thead =  document.createElement('thead');
        let tbody =  document.createElement('tbody');

        let tr = document.createElement('tr');
        let th_rank = document.createElement('th');
        let th_name = document.createElement('th');
        let th_pts = document.createElement('th');
        th_rank.textContent = "Ranking";
        th_name.textContent = "Name";
        th_pts.textContent = "Points";
        tr.append(th_rank,th_name,th_pts);

        thead.append(tr);
        
        array.forEach(player => {
            let tr = document.createElement('tr');
            let tdRank = document.createElement('td');
            let tdName = document.createElement('td');
            let tdPts = document.createElement('td');
            let btn = document.createElement('button');

            tbody.append(tr);

            btn.textContent = "submit";
            btn.classList.add('submit');
            btn.id = player.id;
            btn.dataset.id = player.id;
            btn.addEventListener('click', submit.bind(this, btn.id, array, btn));

            tdRank.textContent = player.rank;
            tdName.textContent = player.name;
            tdPts.textContent = player.pts;
            
            tr.append(tdRank, tdName, tdPts, btn);
        });

        table.append(thead);
        table.append(tbody);
        
        return table;
    }

    function submit(idPlayer, array, btn) {
        let encontrado = false;
        let i = 0;
        btn.disabled = true; 
        while(i < array.length && !encontrado){
            if(array[i].id == idPlayer){
                encontrado = true;
                anotados.push(array[i]);
            }
            i++;
        }
        actualizarInscritos(anotados);  
    }

    //TOURNAMENTS
    function createCardTournament(title) {
        elements.btnStart.style.display = 'none';

        let card = document.createElement('div');
        let cardTitle = document.createElement('h4');
        let cardBody = document.createElement('div');
        let cardFooter = document.createElement('div');

        card.classList.add('card');
        cardTitle.textContent = title;
        cardBody = createTournament(anotados);
        cardFooter.id = "total";
        cardFooter.innerHTML = 'Total de inscriptos: ' + anotados.length;

        card.append(cardTitle, cardBody, cardFooter);
        
        elements.body.append(card);
    }

    function createTournament() {
        let table =  document.createElement('table');
        let thead =  document.createElement('thead');
        let tbody =  document.createElement('tbody');

        let tr = document.createElement('tr');
        let th_rank = document.createElement('th');
        let th_name = document.createElement('th');
        table.id = "anotados";
        tbody.id = "bodyTable";
        th_rank.textContent = "Ranking";
        th_name.textContent = "Name";
        tr.append(th_rank,th_name);

        thead.append(tr);

        table.append(thead);
        table.append(tbody);
        
        return table;
    }
    
    function actualizarInscritos(){
        let table = document.getElementById('anotados');
        let tbody = document.getElementById('bodyTable');
        let tfooter = document.getElementById('total');

        tbody.innerHTML = "";
        anotados.forEach(player => {
            let tr = document.createElement('tr');
            let tdRank = document.createElement('td');
            let tdName = document.createElement('td');
            let btn = document.createElement('button');
            
            btn.textContent = "unsuscribe"
            btn.addEventListener('click', unsuscribe.bind(this, player.id));
            tdRank.textContent = player.rank;
            tdName.textContent = player.name;

            tbody.append(tr);
            tr.append(tdRank, tdName, btn);
        });

        tfooter.innerHTML = 'Total de inscriptos: ' + anotados.length;
        
        table.append(tbody, tfooter);
        
        
    }

    function unsuscribe(idPlayer) {
        let encontrado = false;
        let i = 0;
        while(i < anotados.length && !encontrado){
            if(anotados[i].id == idPlayer){
                encontrado = true;
                anotados.splice(i, 1);
                let btnSumbit = document.getElementById(idPlayer);
                btnSumbit.disabled = false;
                console.log(btnSumbit);
            }
            i++;
        }
        actualizarInscritos(anotados);
    }
    

});
