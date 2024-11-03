import React from 'react';

const Project: React.FC = () => {
  return (
    <div style={{
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center', // Centre le contenu horizontalement
      alignItems: 'center', // Centre le contenu verticalement
    }}>
      <h1 style={{ textAlign: 'center', color: 'white', fontSize: '50px', position:'absolute', top:'520vh' }}>
        Projets
      </h1>
      <div style={{background:'white', height:'500px', width:'500px',position:'absolute', top:'540vh', left:'5%', cursor: 'pointer'}}>

      </div>
      <div style={{background:'red', height:'500px', width:'500px',position:'absolute', top:'540vh', left:'37%', cursor: 'pointer'}}>

      </div>
      <div style={{background:'purple', height:'500px', width:'500px',position:'absolute', top:'540vh', right:'5%', cursor: 'pointer'}}>

      </div>
    </div>
  );
};

export default Project;
