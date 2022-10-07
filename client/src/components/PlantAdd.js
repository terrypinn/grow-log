import { useState } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'

import "react-datepicker/dist/react-datepicker.css";

export default function PlantAdd() {
  const [form, setForm] = useState({
    germinated_on: '',
    location: '',
    method: '',
    name: '',
    note: '',
    planted_on: '',
    propagation: '',
    source: '',
    type: '',
  });
  const navigate = useNavigate();

  // update state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const data = { ...form };
    data.germinated_on = format(form.germinated_on, 'yyyy-MM-dd');
    data.planted_on = format(form.planted_on, 'yyyy-MM-dd');

    await fetch('http://localhost:5000/plant/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ name: '', position: '', level: '' });
    navigate('/');
  }

  return (
    <div>
      <h3>Add</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            className="form-control"
            id="source"
            value={form.source}
            onChange={(e) => updateForm({ source: e.target.value })}
          />
        </div>

        <div className="form-group">
          <p>Type</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="typeOptions"
              id="typeAutoflower"
              value="Autoflower"
              checked={form.type === "Autoflower"}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
            <label htmlFor="typeAutoflower" className="form-check-label">Autoflower</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="typeOptions"
              id="typeRegular"
              value="Regular"
              checked={form.type === "Regular"}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
            <label htmlFor="typeRegular" className="form-check-label">Regular</label>
          </div>
        </div>

        <div className="form-group">
          <p>Propagation</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="propagationOptions"
              id="propagationSeed"
              value="Seed"
              checked={form.propagation === "Seed"}
              onChange={(e) => updateForm({ propagation: e.target.value })}
            />
            <label htmlFor="propagationSeed" className="form-check-label">Seed</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="propagationOptions"
              id="propagationClone"
              value="Clone"
              checked={form.propagation === "Clone"}
              onChange={(e) => updateForm({ propagation: e.target.value })}
            />
            <label htmlFor="propagationClone" className="form-check-label">Clone</label>
          </div>
        </div>

        <div className="form-group">
          <p>Location</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="locationOptions"
              id="locationIndoor"
              value="Indoor"
              checked={form.location === "Indoor"}
              onChange={(e) => updateForm({ location: e.target.value })}
            />
            <label htmlFor="locationIndoor" className="form-check-label">Indoor</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="locationOptions"
              id="locationOutdoor"
              value="Outdoor"
              checked={form.location === "Outdoor"}
              onChange={(e) => updateForm({ location: e.target.value })}
            />
            <label htmlFor="locationOutdoor" className="form-check-label">Outdoor</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="locationOptions"
              id="locationGreenhouse"
              value="Greenhouse"
              checked={form.location === "Greenhouse"}
              onChange={(e) => updateForm({ location: e.target.value })}
            />
            <label htmlFor="locationGreenhouse" className="form-check-label">Greenhouse</label>
          </div>
        </div>

        <div className="form-group">
          <p>Method</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="methodOptions"
              id="methodSoil"
              value="Soil"
              checked={form.method === "Soil"}
              onChange={(e) => updateForm({ method: e.target.value })}
            />
            <label htmlFor="methodSoil" className="form-check-label">Soil</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="methodOptions"
              id="methodAquaponics"
              value="Aquaponics"
              checked={form.method === "Aquaponics"}
              onChange={(e) => updateForm({ method: e.target.value })}
            />
            <label htmlFor="methodAquaponics" className="form-check-label">Aquaponics</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="methodOptions"
              id="methodHydroponics"
              value="Hydroponics"
              checked={form.method === "Hydroponics"}
              onChange={(e) => updateForm({ method: e.target.value })}
            />
            <label htmlFor="methodHydroponics" className="form-check-label">Hydroponics</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="methodOptions"
              id="methodAeroponics"
              value="Aeroponics"
              checked={form.method === "Aeroponics"}
              onChange={(e) => updateForm({ method: e.target.value })}
            />
            <label htmlFor="methodAeroponics" className="form-check-label">Aeroponics</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="germinated-on">Germinated On</label>
          <DatePicker
            id='germinated-on'
            dateFormat="dd/MM/yyyy"
            onChange={(date) => updateForm({ germinated_on: date })}
            selected={form.germinated_on}
          />
        </div>

        <div className="form-group">
          <label htmlFor="planted-on">Planted On</label>
          <DatePicker
            id='planted-on'
            dateFormat="dd/MM/yyyy"
            onChange={(date) => updateForm({ planted_on: date })}
            selected={form.planted_on}
          />
        </div>

        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea
            className="form-control"
            id="note"
            value={form.note}
            onChange={(e) => updateForm({ note: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <input
            type="submit"
            value="Add"
            className="btn btn-primary"
          />
        </div>

      </form>
    </div>
  );
}
