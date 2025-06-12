document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.querySelector('.input-area');
    const discardBtn = document.getElementById('discardBtn');
    const mainPageTrashCan = document.getElementById('mainPageTrashCan');
    const trashContainerWrapper = document.querySelector('.trash-container-wrapper');

    // **텍스트 입력 필드 동적으로 생성 (이 코드가 누락되지 않았는지 다시 확인!)**
    const opinionInput = document.createElement('textarea');
    opinionInput.id = 'opinionInput';
    opinionInput.placeholder = '사라져야 할 기술과 그 이유를 입력해주세요...';
    inputArea.prepend(opinionInput);

    // 저장된 의견을 불러오거나, 없으면 빈 배열로 초기화
    let opinions = JSON.parse(localStorage.getItem('discardedOpinions')) || [];

    // --- 쓰레기통 이미지 및 가시성 초기 상태 설정 함수 ---
    function updateTrashCanState() {
        if (opinions.length > 0) {
            mainPageTrashCan.src = 'images/filled_trash_can.png';
            mainPageTrashCan.alt = '꽉 찬 쓰레기통';
            trashContainerWrapper.classList.add('show');
        } else {
            trashContainerWrapper.classList.remove('show');
            mainPageTrashCan.src = 'images/empty_trash_can.png';
            mainPageTrashCan.alt = '빈 쓰레기통';
        }
    }

    // 페이지 로드 시 쓰레기통 상태 초기화
    updateTrashCanState();

    // '버리기' 버튼 클릭 이벤트 리스너
    discardBtn.addEventListener('click', addOpinion);

    // Enter 키를 눌렀을 때도 의견이 추가되도록
    opinionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addOpinion();
        }
    });

    function addOpinion() {
        const opinionText = opinionInput.value.trim();

        if (opinionText === '') {
            alert('의견을 입력해주세요!');
            return;
        }

        opinions.push(opinionText);
        localStorage.setItem('discardedOpinions', JSON.stringify(opinions));

        if (!trashContainerWrapper.classList.contains('show')) {
            trashContainerWrapper.classList.add('show');
        }
        
        mainPageTrashCan.src = 'images/filled_trash_can.png';
        mainPageTrashCan.alt = '꽉 찬 쓰레기통';

        opinionInput.value = '';
        opinionInput.focus();
    }

    // --- 쓰레기통 클릭 이벤트: 버려진 의견 페이지로 이동 ---
    mainPageTrashCan.addEventListener('click', () => {
        window.location.href = 'view_opinions.html';
    });
});