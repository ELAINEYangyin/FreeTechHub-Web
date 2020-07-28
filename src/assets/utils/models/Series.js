import Model from "./Model"
import Blog from "./Blog"
import axios from "axios"
import BASE_URL from '../consts'

class Series extends Model {
    static app_name = 'blog'
    static model_name = 'series'

    constructor({id, name, description, date, viewTimes,
                 owner, sub_series_of, sub_series, blogs}) {
        super({name, description, date, viewTimes,
               owner, sub_series_of,})

        // required data fields
        this.app_name = 'blog'
        this.model = "series"
        this.pk = id

        // this custom data for Tag
        this.sub_series_ids = sub_series
        this.sub_series = []
        this.blogs = []
        if (blogs != undefined) {
            this.blogs = []
            blogs.forEach(blog => { this.blogs.push(new Blog(blog)) })
        }
        this.tags = []
        this.blogs.forEach(blog => {
            this.tags = this.tags.concat(blog.tags)
        })
    }

    // custom methods
    async get_series() {
        for (let id in this.sub_series_ids) {
            let res = await axios.get(BASE_URL + `${this.app_name}/`+`series/${id}`)
            let one_series = new Series(res.data)
            this.sub_series.push(one_series)
        }
        return this.sub_series
    }

    // get model by id
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    // get all the model
    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default Series