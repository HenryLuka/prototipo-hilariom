import{L as t}from"./leaflet.BI7ZIMF2.js";const a=-23.3191164,o=-46.1231937;let r=null;function l(){const n=document.getElementById("coverage-map");if(!n)return;if(r){try{r.remove()}catch{}r=null}const e=t.map(n,{center:[a,o],zoom:7,scrollWheelZoom:!1,attributionControl:!0});r=e,t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',subdomains:["a","b","c"],maxZoom:19}).addTo(e);const s=t.circle([a,o],{radius:5e5,color:"#343432",weight:2,dashArray:"8, 8",fillColor:"#fce883",fillOpacity:.18}).addTo(e);t.circle([a,o],{radius:25e4,color:"#4a4a47",weight:1.5,dashArray:"5, 5",fillColor:"#fce883",fillOpacity:.12}).addTo(e),t.circle([a,o],{radius:1e5,color:"#262624",weight:2,fillColor:"#fce883",fillOpacity:.28}).addTo(e);const d=t.divIcon({className:"factory-div-icon",html:`
        <div class="factory-marker-wrapper">
          <span class="factory-marker-pulse"></span>
          <div class="factory-marker-pin">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      `,iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]}),p=t.marker([a,o],{icon:d}).addTo(e);p.bindPopup(`
      <div class="leaflet-hilariom-popup">
        <span class="popup-badge">FÁBRICA HILARIOM</span>
        <strong class="popup-title">Origem do Frete</strong>
        <p class="popup-addr">R. Ceará, 212 - Parateí<br>Guararema - SP, 08900-000</p>
        <div class="popup-meta">
          <span>Alcance: Raio até 500 km</span>
        </div>
        <a href="https://maps.google.com/?q=R.+Cear%C3%A1,+212+-+Parate%C3%AD,+Guararema+-+SP,+08900-000" target="_blank" rel="noopener" class="popup-link">
          Abrir rota no Google Maps &rarr;
        </a>
      </div>
    `),e.fitBounds(s.getBounds(),{padding:[25,25]});const c=document.getElementById("btn-fit-500"),i=document.getElementById("btn-focus-factory");c?.addEventListener("click",()=>{c.classList.add("active"),i?.classList.remove("active"),e.fitBounds(s.getBounds(),{padding:[25,25],animate:!0})}),i?.addEventListener("click",()=>{i.classList.add("active"),c?.classList.remove("active"),e.setView([a,o],15,{animate:!0}),p.openPopup()}),setTimeout(()=>{e.invalidateSize()},250)}document.addEventListener("astro:page-load",l);(document.readyState==="complete"||document.readyState==="interactive")&&l();
