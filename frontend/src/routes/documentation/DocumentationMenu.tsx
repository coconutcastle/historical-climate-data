import { NavLink } from 'react-router-dom';

export function DocumentationMenu() {
  return (
    <div className='doc-menu me-auto'>
      <div>
        <NavLink to='/documentation/about'>
          About
        </NavLink>
      </div>
      <div>
        <NavLink to='/documentation/params'>
          Download Parameters
        </NavLink>
      </div>
      <div>
        <NavLink to='/documentation/format'>
          Download Format
        </NavLink>
      </div>
      <div>
        <NavLink to='/documentation/api'>
          API
        </NavLink>
      </div>
    </div>
  )
}