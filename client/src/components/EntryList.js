import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function EntryList(props) {

  return (
    <div>
      {props.entries}
    </div>
  );
}
