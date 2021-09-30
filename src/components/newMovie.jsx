import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class NewMovie extends Form {
    state = {
        data: { title: '', numberinstock: '', rate: '' },
        errors: {}
    }

    schema = {
        title: Joi.string().required().label('Title'),
        // genre: Joi.string().required().label('Genre'),
        numberinstock: Joi.string().required().label('Number in Stock'),
        rate: Joi.string().required().label('Rate')

    }
    genres = getGenres();


    doSubmit() {
        // add movie
        console.log("new movie submitted");
        console.log(this.state.data);
    }
    handleSelectChange = e => {

        console.log(e.target.value);
        const genre = this.genres.filter(g => g._id === e.target.value);
        console.log(genre);
    }


    render() {

        return <div>


            <h1>New Movie</h1>

            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title', 'Title')}

                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-select form-control" aria-label="Default select example" onChange={this.handleSelectChange}>
                        <option ></option>

                        {this.genres.map(
                            g => <option key={g._id} value={g._id}>{g.name}</option>
                        )}

                    </select>
                </div>


                {this.renderInput('numberinstock', 'Number in Stock')}
                {this.renderInput('rate', 'Rate')}
                {this.renderButton('Save')}
            </form>

        </div>;


    }

}

export default NewMovie;