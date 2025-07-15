import './App.css';
import { useEffect, useRef, useState } from 'react';
import { values_roundstarting, values_roundweapon } from './data/Values'; 

function App() {
  const musicRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    musicRef.current = new Audio('/sound/menu-music.mp3');
    musicRef.current.loop = true;
    musicRef.current.volume = 0.1;
  }, []);

  const startMusic = () => {
    if (!musicStarted && musicRef.current) {
      musicRef.current.play().catch(() => {
        console.log('El autoplay fue bloqueado');
      });
      setMusicStarted(true);
    }
  };

  const playHoverSound = () => {
    const hoverAudio = new Audio('/sound/hover.mp3');
    hoverAudio.volume = 0.1;
    hoverAudio.play();
    if (!musicStarted) startMusic();
  };

  const handleNewGameClick = () => {
    playHoverSound();
    setShowForm(true);
  };

  const handleSubmit = () => {
    const selectedEquipment = document.querySelector('select[name="equipmentValue"]').value;
    const selectedWeaponCategory = document.querySelector('select[name="weaponType"]').value;

    let PrimaryAssaultRifle = 0;
    let PrimarySniperRifle = 0;
    let PrimaryHeavy = 0;
    let PrimarySMG = 0;
    let PrimaryPistol = 0;


    switch(selectedWeaponCategory) {
      case 'Asalto':
        PrimaryAssaultRifle = 1;
        break;
      case 'Sniper':
        PrimarySniperRifle = 1;
        break;
      case 'Heavy':
        PrimaryHeavy = 1;
        break;
      case 'SMG':
        PrimarySMG = 1;
        break;
      case 'Pistola':
        PrimaryPistol = 1;
        break;
      default:
        break;
    }

    console.log("Equipment Value:", selectedEquipment);
    console.log("PrimaryAssaultRifle:", PrimaryAssaultRifle);
    console.log("PrimarySniperRifle:", PrimarySniperRifle);
    console.log("PrimaryHeavy:", PrimaryHeavy);
    console.log("PrimarySMG:", PrimarySMG);
    console.log("PrimaryPistol:", PrimaryPistol);
  };

  return (
    <div
      className="menu-container"
      onClick={startMusic}
      onMouseMove={startMusic}
    >
      <ul className="menu">
        <li onMouseEnter={playHoverSound} onClick={handleNewGameClick}>
          New Game
        </li>
        <li onMouseEnter={playHoverSound}>Find Servers</li>
        <li onMouseEnter={playHoverSound}>Options</li>
        <li onMouseEnter={playHoverSound}>Exit</li>
      </ul>

      {showForm && (
        <div className="form-overlay">
          <div className="form-wrapper">
            <form className="new-game-form">
              <h2>Nueva Predicción</h2>

              <label>
                Valor de equipo inicial:  
                <select name="equipmentValue">
                  {values_roundstarting.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </label>

              <label>
                Arma de la ronda:
                <select name="weaponType">
                  {values_roundweapon.map((weapon, index) => (
                    <option key={index} value={weapon}>{weapon}</option>
                  ))}
                </select>
              </label>

              <div className="form-buttons">
                <button type="button" onClick={handleSubmit}>Iniciar</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
