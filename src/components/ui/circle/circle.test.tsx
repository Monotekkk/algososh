import React from 'react';
import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

it('circle without letter', () => {
    const tree = renderer
        .create(<Circle />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('circle with letter', () => {
    const tree = renderer
        .create(<Circle />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with head', () => {
    const tree = renderer
        .create(<Circle head={'test text'}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with react in head', () => {
    const tree = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with tail', () => {
    const tree = renderer
        .create(<Circle tail={'test text'}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with react in tail', () => {
    const tree = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with index', () => {
    const tree = renderer
        .create(<Circle index={0} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with props isSmall ===  true', () => {
    const tree = renderer
        .create(<Circle isSmall={true} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with state in default', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with state in changing', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('circle with state in modified', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});