(function() {
 
  let cartTray = document.querySelector('#cart-tray');
  if (!cartTray) {
    cartTray = document.createElement('div');
    cartTray.id = 'cart-tray';
    Object.assign(cartTray.style, {
        position: 'fixed',
        right: '20px',
        top: '80px',
        width: '320px',
        maxHeight: '60vh',
        overflowY: 'auto',
        background: '#fff',
        border: '1px solid #ddd',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        padding: '10px',
        borderRadius: '8px',
        zIndex: 10000,
        fontFamily: 'sans-serif',
        fontSize: '14px',
        display: 'none' 
});
    const title = document.createElement('div');
    title.textContent = 'Produtos no Carrinho';
    Object.assign(title.style, { fontWeight: '700', marginBottom: '8px' });
    const list = document.createElement('div');
    list.id = 'cart-tray-list';
    cartTray.appendChild(title);
    cartTray.appendChild(list);
    document.body.appendChild(cartTray);
  }
  const trayList = document.querySelector('#cart-tray-list');

  window._cartBtnMap = window._cartBtnMap || {};

  document.querySelectorAll('.produto-btn').forEach(function(btn, idx) {
   
    btn.dataset.originalText = (btn.textContent || '').trim();
    btn.dataset.originalBg = btn.style.background || '';
    btn.dataset.originalColor = btn.style.color || '';
    btn.dataset.added = 'false';

    const cartCounter = document.querySelector('#cart-count');

    const productEl = btn.closest('.destaques-card, .produto, .produto-card') || btn.parentElement;
    const stableId = btn.dataset.productId
      || (productEl && (productEl.dataset.produtoId || productEl.id))
      || 'prod-' + idx;
    const productName =
      btn.dataset.name
      || (productEl && (productEl.querySelector('.produto-nome, figcaption, h3, h2, .title, .nome')?.textContent?.trim()))
      || btn.dataset.productName
      || btn.textContent.trim();
    const productImage =
      btn.dataset.image
      || (productEl && productEl.querySelector('img')?.src)
      || '';

    window._cartBtnMap[stableId] = btn;

    function createTrayItem(id, name, image, originalBtn) {
      if (trayList.querySelector(`[data-tray-id="${CSS.escape(id)}"]`)) return;
      const row = document.createElement('div');
      row.dataset.trayId = id;
      Object.assign(row.style, { display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' });

      let thumb;
      if (image) {
        thumb = document.createElement('img');
        thumb.src = image;
        thumb.alt = name;
        Object.assign(thumb.style, { width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px', flex: '0 0 56px' });
      } else {
        thumb = document.createElement('div');
        Object.assign(thumb.style, { width: '56px', height: '56px', background: '#f0f0f0', borderRadius: '6px', flex: '0 0 56px' });
      }

      const info = document.createElement('div');
      info.style.flex = '1';
      const nameEl = document.createElement('div');
      nameEl.textContent = name;
      Object.assign(nameEl.style, { fontSize: '13px', fontWeight: '600', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
      info.appendChild(nameEl);

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '6px';
      actions.style.justifyContent = 'flex-end'
      actions.style.alignItems = 'center';

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
        removeBtn.textContent = 'Remover';
        Object.assign(row.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0'
});

        Object.assign(removeBtn.style, { background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 8px', cursor: 'pointer' });

      removeBtn.addEventListener('click', function() {
        row.remove();
        
        if (cartCounter) {
          const n = parseInt(cartCounter.textContent, 10) || 0;
          cartCounter.textContent = Math.max(0, n - 1);
        }
       
        if (originalBtn) {
          originalBtn.textContent = originalBtn.dataset.originalText;
          originalBtn.style.background = originalBtn.dataset.originalBg;
          originalBtn.style.color = originalBtn.dataset.originalColor;
          originalBtn.dataset.added = 'false';
          originalBtn.disabled = false;
        } else {
          
          const mapped = window._cartBtnMap[id];
          if (mapped) {
            mapped.textContent = mapped.dataset.originalText;
            mapped.style.background = mapped.dataset.originalBg;
            mapped.style.color = mapped.dataset.originalColor;
            mapped.dataset.added = 'false';
            mapped.disabled = false;
          }
        }

       
        const toast = document.createElement('div');
        toast.textContent = 'Retirado do Carrinho';
        Object.assign(toast.style, {
          position: 'fixed',
          left: '50%',
          bottom: '30px',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          zIndex: 9999
        });
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 1400);
      });

      actions.appendChild(removeBtn);

      row.appendChild(thumb);
      row.appendChild(info);
      row.appendChild(actions);
      trayList.appendChild(row);
    }

    function removeTrayItem(id) {
      const item = trayList.querySelector(`[data-tray-id="${CSS.escape(id)}"]`);
      if (item) item.remove();
    }

    btn.addEventListener('click', function(event) {
      event.preventDefault();

      const isAdded = btn.dataset.added === 'true';

      if (!isAdded) {
        // Exibe mensagem de adicionado ao carrinho
        const toast = document.createElement('div');
        toast.textContent = 'Adicionado ao carrinho!';
        Object.assign(toast.style, {
          position: 'fixed',
          left: '50%',
          bottom: '30px',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          zIndex: 9999
        });
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 1500);

        btn.textContent = 'Adicionado';
        btn.style.background = '#aaa';
        btn.style.color = '#fff';
        btn.dataset.added = 'true';

        // adiciona item na bandeja com referência ao botão original
        createTrayItem(stableId, productName, productImage, btn);

        // incrementa contador se existir
        if (cartCounter) {
          const n = parseInt(cartCounter.textContent, 10) || 0;
          cartCounter.textContent = n + 1;
        }
      } else {
        // Exibe mensagem de retirado do carrinho
        const toast = document.createElement('div');
        toast.textContent = 'Retirado do Carrinho!';
        Object.assign(toast.style, {
          position: 'fixed',
          left: '50%',
          bottom: '30px',
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          zIndex: 9999
        });
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 1500);

        // Reverte o botão ao estado original
        btn.textContent = btn.dataset.originalText;
        btn.style.background = btn.dataset.originalBg;
        btn.style.color = btn.dataset.originalColor;
        btn.dataset.added = 'false';

        // remove da bandeja
        removeTrayItem(stableId);

        // decrementa contador se existir (não deixa negativo)
        if (cartCounter) {
          const n = parseInt(cartCounter.textContent, 10) || 0;
          cartCounter.textContent = Math.max(0, n - 1);
        }
      }
      
    });
  });
})();



const cartToggle = document.querySelector('#cart-toggle');
if (cartToggle) {
  cartToggle.addEventListener('click', function () {
    const tray = document.querySelector('#cart-tray');
    if (tray) {
      tray.style.display = tray.style.display === 'none' ? 'block' : 'none';
    }
  });
}
