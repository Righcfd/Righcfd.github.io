// تحميل العناصر عند بدء التطبيق
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
    document.getElementById('addButton').addEventListener('click', addItem);
});

// تخزين البيانات محليًا
let items = JSON.parse(localStorage.getItem('items')) || [];

// إضافة عناصر مخزنة سابقًا
function loadItems() {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        
        const itemText = document.createElement('span');
        itemText.textContent = item;
        li.appendChild(itemText);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.style.backgroundColor = '#f44336';
        deleteButton.onclick = () => removeItem(index);
        
        li.appendChild(deleteButton);
        itemsList.appendChild(li);
    });
}

// إضافة عنصر جديد
function addItem() {
    const text = prompt('أدخل نص العنصر الجديد:');
    if (text) {
        items.push(text);
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    }
}

// حذف عنصر
function removeItem(index) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    loadItems();
}
