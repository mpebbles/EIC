import React from 'react';
import ReactDOM from 'react-dom';
import InfoBox from '../../components/InfoBox';
import ReactTestUtils from 'react-dom/test-utils';

export function verifyInfoBoxTitle() {
  let TEST_TITLE = "Name Here"
  var component = ReactTestUtils.renderIntoDocument(
  <InfoBox email="testEmail" biography="testBio"
    skills="testSkills" name={TEST_TITLE}/>
  );

  var li = ReactTestUtils.findRenderedDOMComponentWithTag(
   component, 'li'
  );

  if (li instanceof HTMLElement) {
    const child = li.querySelector('.title_and_button');
    const title = child.querySelector('.title');
    if(title.textContent == TEST_TITLE) {
      return true;
    }
  }
  return false;
}
