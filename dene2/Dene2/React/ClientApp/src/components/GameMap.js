import React, { Component } from 'react';

export class GameMap extends Component {
    static displayName = GameMap.name;

    constructor(props) {
        super(props);
        this.state = { gamemap: [], loading: true };
    }

    componentDidMount() {
        this.populateGameMap();
    }

    static renderGameMap(gameMap) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Tip</th>
                    </tr>
                </thead>
                <tbody>
                    {gameMap.map(gameMap =>
                        <tr key={gameMap.date}>
                            <td>{gameMap.date}</td>
                            <td>{gameMap.temperatureC}</td>
                            <td>{gameMap.temperatureF}</td>
                            <td>{gameMap.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : GameMap.renderGameMap(this.state.gamemap);

        return (
            <div>
                <h1 id="tabelLabel" >Gamemap</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateGameMap() {
        const response = await fetch('gamemap');
        //var xx = await response.body;
        const data = await response.json();
        this.setState({ gamemap: data, loading: false });
    }
}
