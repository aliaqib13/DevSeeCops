import React, { Component } from 'react';
import './courses-searchbar.scss';
import { Select, Typography, Input } from 'antd';

const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;

export default class CoursesSearchbar extends Component {
    state = {
        categories: [],
        category: '',
        keyword: '',
    }

    handleChange = value => {
        this.setState({
            keyword: value,
        });
        this.props.fetchCourses(this.state.category, value);
    }

    selectHandleChange = value => {
        this.setState({
            category: value,
        });
        this.props.fetchCourses(value, this.state.keyword);
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="courses-searchbar">
                <Title level={4}>Courses</Title>

                <Search
                    placeholder="Search"
                    onSearch={value => this.handleChange(value)}
                    className="searchContainer"
                />
                <Select
                    defaultValue="Category"
                    style={{ width: 190 }}
                    onChange={this.selectHandleChange}
                    className="filterSelect"
                >
                    <Option value={null}>All categories</Option>
                    {
                        categories ? categories.map((item, key) => <Option value={item.id} key={key}>{item.name}</Option>) : null
                    }
                </Select>
            </div>
        );
    }
}
